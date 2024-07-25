package models

type LocalManga struct {
	ID            string `json:"id"`
	Title         string `json:"title"`
	LastChapter   int    `json:"lastChapter"`
	TotalChapter  int    `json:"totalChapter"`
	LastChapterID string `json:"lastChapterID"`
	Image         string `json:"image"`
}

type Locale struct {
	LastManga *LocalManga            `json:"lastManga"`
	Progress  map[string]*LocalManga `json:"progress"`
}
