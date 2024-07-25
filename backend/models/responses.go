package models

type LastMangaResponse struct {
	Exists    bool        `json:"exists"`
	LastManga *LocalManga `json:"lastManga"`
}

type ProgressResponse struct {
	Mangas []*LocalManga `json:"mangas"`
	Count  int           `json:"count"`
}

type SearchResponse struct {
	MangaList []SearchResult `json:"mangaList"`
	Count     int            `json:"count"`
}
