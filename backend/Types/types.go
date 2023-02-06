package types

type MangaMetaData struct {
	Title, Japanesetitle, Description string
	Totalchapters, Progress           int
}

type MultipleMangas map[string]MangaMetaData

// for Data manager
type MangasData struct {
	MyManga []string // to keep my manga
	MultipleMangas
	LastManga string
}

type Downloads struct {
	Dls map[string][]string
}

type MangaUrls struct {
	// FIXME : update when DB ready
	Last     string
	Order    []string
	Chapters map[string][]string
}

// methods for Data Manager types
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

// for download manager
type Page string
type Pages []Page

type Ids struct {
	MngId, ChapId string
}

type Chapter struct {
	Pages
	PagesLength int
	Ids         Ids
}

// for Server Manager
type Endpoint string
type Endpoints []Endpoint
