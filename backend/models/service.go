package models

type ServiceChapter struct {
	ID        string `json:"id"`
	Path      string `json:"path"`
	Name      string `json:"name"`
	View      string `json:"view"`
	CreatedAt string `json:"createdAt"`
}

type MetaData struct {
	ImageURL    string           `json:"imageUrl"`
	Name        string           `json:"name"`
	Author      string           `json:"author"`
	Status      string           `json:"status"`
	Updated     string           `json:"updated"`
	View        string           `json:"view"`
	Genres      []string         `json:"genres"`
	ChapterList []ServiceChapter `json:"chapterList"`
}
type ReadingChapter struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Image struct {
	Title string `json:"title"`
	Image string `json:"image"`
}

type Assets struct {
	Title          string           `json:"title"`
	CurrentChapter string           `json:"currentChapter"`
	ChapterListIds []ReadingChapter `json:"chapterListIds"`
	Images         []Image          `json:"images"`
}
