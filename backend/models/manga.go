package models

type Chapter struct {
	ID        string `json:"id"`
	Path      string `json:"path"`
	Name      string `json:"name"`
	View      string `json:"view"`
	CreatedAt string `json:"createdAt"`
}

type Manga struct {
	ImageURL    string    `json:"imageUrl"`
	Name        string    `json:"name"`
	Author      string    `json:"author"`
	Status      string    `json:"status"`
	Updated     string    `json:"updated"`
	View        string    `json:"view"`
	Genres      []string  `json:"genres"`
	ChapterList []Chapter `json:"chapterList"`
}

type SearchResult struct {
	ID    string `json:"id"`
	Image string `json:"image"`
	Title string `json:"title"`
}
