package datamanager

import (
	"encoding/json"
	"fmt"
	. "mngapp/backend/Types"
	utils "mngapp/backend/utils"
	"os"
)

type DataManager struct {
	DataDir string
	OutDir  string
	MangaUrls
}

// dataDir : Meta Data Shit
// outDir  : Downloads Dir
func DMInit(dataDir, outDir string) *DataManager {
	return &DataManager{
		DataDir: dataDir,
		OutDir:  outDir,
	}
}

func (dt *DataManager) getPathToChapOut(mangaId string) string {
	return dt.OutDir + "/" + mangaId
}

func (dt *DataManager) GetPathToMangasMetaData() string {
	return dt.DataDir + "/metadata.json"
}

func (dt *DataManager) GetPathToMangaDownloadsData() string {
	return dt.DataDir + "/downloads.json"
}

func (dt *DataManager) getData() *MangasData {
	data, _ := os.ReadFile(dt.GetPathToMangasMetaData())

	var mng *MangasData
	json.Unmarshal(data, &mng)

	return mng
}

func (dt *DataManager) GetAll() *MangasData {
	return dt.getData()
}

func (dt *DataManager) saveData(newData *MangasData) error {
	newMetaData, _ := json.MarshalIndent(newData, "", "  ")
	err := os.WriteFile(dt.GetPathToMangasMetaData(), newMetaData, 0644)
	return err
}

func (dt *DataManager) GetMangasData() *MultipleMangas {
	return &dt.getData().MultipleMangas
}

func (dt *DataManager) GetMyManga() []string {
	return dt.getData().MyManga
}

func (dt *DataManager) GetLastManga() string {
	return dt.getData().LastManga
}

func (dt *DataManager) SetLastManga(lastManga string) {
	temp := dt.getData()
	temp.LastManga = lastManga
	dt.saveData(temp)
}

func (dt *DataManager) GetMangaData(mangaId string) MangaMetaData {
	return (*dt.GetMangasData())[mangaId]
}

func (dt *DataManager) UpdateMangaProgress(mngId string, newProgress int) {
	oldData := dt.getData()
	oldData.SetProgress(mngId, newProgress)
	dt.saveData(oldData)
}

func (dt *DataManager) IncrementProgress(mngId string) {
	oldData := dt.getData()
	oldData.IncrementProgress(mngId)
	dt.saveData(oldData)
}

func (dt *DataManager) GetDownloadedMangas() *Downloads {
	data, _ := os.ReadFile(dt.GetPathToMangaDownloadsData())

	var dls *Downloads
	json.Unmarshal(data, &dls)

	return dls
}

func (dt *DataManager) GetDownloadedChapters(mngId string) []string {
	return dt.GetDownloadedMangas().Dls[mngId]
}

func (dt *DataManager) SetDownloadedMangas(mngId, chapter string) {
	old := dt.GetDownloadedMangas()
	tmp, ok := old.Dls[mngId]

	if !ok {
		old.Dls[mngId] = []string{chapter}

	} else {
		tmp = append(tmp, chapter)
		old.Dls[mngId] = tmp
	}

	newMetaData, _ := json.MarshalIndent(old, "", "  ")
	os.WriteFile(dt.GetPathToMangaDownloadsData(), newMetaData, 0644)
}

// -> to be passed to the server manager
func (dt *DataManager) LoadMangaDBURLs(mangaId string) error {
	// FIXME : handle the directory structure
	data, err := os.ReadFile(fmt.Sprintf("%s/urls/%s.json", dt.DataDir, mangaId))

	if err != nil {
		return err
	}

	json.Unmarshal(data, &dt.MangaUrls)
	dt.MangaUrls.Last = mangaId

	return nil
}

func (dt *DataManager) GetChapterURLs(chapId string) []string {
	if dt.MangaUrls.Last == "" {
		panic("wtf bro")
	}
	return dt.MangaUrls.Chapters[chapId]
}

func (dt *DataManager) ChapterIsDownloaded(mangaId, chapId string) (string, error) {

	path := fmt.Sprintf("%s/%s", dt.OutDir, chapId)
	if utils.DirExists(path) {
		return path, nil
	}
	return "", nil
}
