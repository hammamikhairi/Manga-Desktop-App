package downloadmanager

import (
	"fmt"
	"io"
	"log"
	mng "mngapp/backend/DataManager"
	utils "mngapp/backend/utils"
	"net/http"
	"os"
	"sync"
	"time"
)

// TODO : Handle Errors

const (
	ASYNC_DLS = 3
)

type Folders struct {
	DataDir string
	OutDir  string
}

type DownloadManager struct {
	Folders   Folders
	Downloads chan struct{}
	wg        sync.WaitGroup
}

func DLMInit(dataDir, outDir string) *DownloadManager {
	return &DownloadManager{
		Folders: Folders{
			DataDir: dataDir,
			OutDir:  outDir,
		},
		Downloads: make(chan struct{}, ASYNC_DLS),
	}
}

func (dl *DownloadManager) getPathToChapOut(mangaId string) string {
	return dl.Folders.OutDir + "/" + mangaId
}

func (dl *DownloadManager) DownloadChapter(c mng.Chapter) {
	dl.wg.Add(c.PagesLength)

	// check manga dir
	utils.CheckDirectory(dl.getPathToChapOut(c.Ids.MngId))
	// make new dir for chapter
	dlPath := dl.getPathToChapOut(c.Ids.MngId) + "/" + c.Ids.ChapId
	utils.CheckDirectory(dlPath)

	for index, url := range c.Pages {
		dl.Downloads <- struct{}{}
		go dl.Download(url, index, dlPath)
	}
	dl.wg.Wait()
}

func (dl *DownloadManager) DownloadImg(url mng.Page) {
	// fmt.Println("downloading : ", url)
	time.Sleep(time.Second * 1)
	<-dl.Downloads
	dl.wg.Done()
}

func (dl *DownloadManager) Download(url mng.Page, pageN int, dlPath string) {

	fname := utils.GetPageName(pageN, string(url))
	fmt.Println(dlPath + "/" + fname)

	f, err := os.Create(dlPath + "/" + fname)

	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	res, err := http.Get(string(url))

	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()

	_, err = io.Copy(f, res.Body)

	if err != nil {
		log.Fatal(err)
	}

	<-dl.Downloads
	dl.wg.Done()
}

func Test() {
	// create manager
	home, _ := os.UserHomeDir()
	dlm := DLMInit(home+"/mngApp/Data", home+"/mngApp")

	dlm.DownloadChapter(mng.Chapter{
		Pages:       []mng.Page{"hello", "world", "there", "5", " zeze "},
		PagesLength: 5,
		Ids: mng.Ids{
			MngId:  "idk",
			ChapId: "no no",
		},
	}) // MUST KEEP ON RUNNING
}
