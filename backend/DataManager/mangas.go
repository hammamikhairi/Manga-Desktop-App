package datamanager

import (
	"encoding/json"
	"os"
)

type MultipleMangas map[string]MangaMetaData

type MangaMetaData struct {
	Title, Japanesetitle, Description string
	Totalchapters, Progress           int
}

func (tm *MangasData) SetProgress(mngId string, newProg int) {
	tmp := tm.MultipleMangas[mngId]
	tmp.Progress = newProg
	tm.MultipleMangas[mngId] = tmp
}

func (tm *MangasData) IncrementProgress(mngId string) {
	tm.SetProgress(mngId, tm.MultipleMangas[mngId].Progress+1)
}

func (tm *MangasData) SetTotalChapters(mngId string, newTotal int) {
	tmp := tm.MultipleMangas[mngId]
	tmp.Totalchapters = newTotal
	tm.MultipleMangas[mngId] = tmp
}

type MangasData struct {
	MyManga []string // to keep my manga
	MultipleMangas
}

type Downloads struct {
	Dls map[string][]string
}

func (mm *MangasData) Save(path string) error {
	cfgData, _ := json.MarshalIndent(mm, "", "  ")

	err := os.WriteFile(path, cfgData, 0644)
	return err
}

// for download manager
type Page string

type Ids struct {
	MngId, ChapId string
}

type Chapter struct {
	Pages       []Page
	PagesLength int
	Ids         Ids
}
