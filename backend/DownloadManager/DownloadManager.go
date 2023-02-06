package downloadmanager

import (
	"fmt"
	"io"
	"log"
	types "mngapp/backend/Types"
	utils "mngapp/backend/utils"
	"net/http"
	"os"
	"sync"
)

// DONE

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

// dataDir : Metadata and shit
// outDir  : download directory
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

func (dl *DownloadManager) DownloadChapter(c types.Chapter) {
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

func (dl *DownloadManager) Download(url types.Page, pageN int, dlPath string) {

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
