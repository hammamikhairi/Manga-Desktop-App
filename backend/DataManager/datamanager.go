package datamanager

import (
	"encoding/json"
	// "fmt"
	"os"
)

type DataManager struct {
	DataDir string
	OutDir  string
}

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

func (dt *DataManager) setData(newData *MangasData) error {
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

func (dt *DataManager) GetMangaData(mangaId string) MangaMetaData {
	return (*dt.GetMangasData())[mangaId]
}

func (dt *DataManager) UpdateMangaProgress(mngId string, newProgress int) {
	oldData := dt.getData()
	oldData.SetProgress(mngId, newProgress)
	dt.setData(oldData)
}

func (dt *DataManager) IncrementProgress(mngId string) {
	oldData := dt.getData()
	oldData.IncrementProgress(mngId)
	dt.setData(oldData)
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
