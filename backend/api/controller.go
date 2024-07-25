package api

import (
	"encoding/json"
	"manelo/backend/models"
	"os"
	"strings"
)

type MangaController struct {
	handler *MangaHandler
	history *models.Locale
	path    string
	cache   map[string]map[string]string
}

func NewMangaController(path, server string) *MangaController {

	controller := &MangaController{
		path:    path,
		handler: NewMangaHandler(path, server),
		cache:   make(map[string]map[string]string),
	}

	err := controller.LoadHistory(path)

	if err != nil {
		panic(err)
	}

	return controller
}

func (controller *MangaController) LoadHistory(path string) error {
	file, err := os.OpenFile(path, os.O_RDONLY, 0644)
	if err != nil {
		return err
	}

	err = json.NewDecoder(file).Decode(&controller.history)
	if err != nil {
		return err
	}

	return nil
}

func (controller *MangaController) GetLastManga() models.LastMangaResponse {

	lastManga := controller.history.LastManga

	response := models.LastMangaResponse{
		LastManga: lastManga,
		Exists:    lastManga != nil,
	}

	return response
}

func (controller *MangaController) GetMangaList() models.ProgressResponse {

	mangaList := controller.history.Progress

	if len(mangaList) == 0 {
		return models.ProgressResponse{
			Mangas: nil,
			Count:  0,
		}
	}

	mangas := make([]*models.LocalManga, 0)
	for _, manga := range mangaList {
		mangas = append(mangas, manga)
	}

	return models.ProgressResponse{
		Mangas: mangas,
		Count:  len(mangas),
	}
}

func (controller *MangaController) SearchManga(query string) models.SearchResponse {

	mangas, err := controller.handler.service.SearchManga(query)
	if err != nil {
		return models.SearchResponse{
			MangaList: nil,
			Count:     0,
		}
	}

	if controller.cache["images"] == nil {
		controller.cache["images"] = make(map[string]string)
	}

	for _, manga := range mangas {
		controller.cache["images"][manga.ID] = manga.Image
	}

	return models.SearchResponse{
		MangaList: mangas,
		Count:     len(mangas),
	}

}

func (controller *MangaController) GetManga(id string) (models.MetaData, error) {
	return controller.handler.service.GetManga(id)
}

func (controller *MangaController) GetChapter(query string) models.Assets {
	chapterData, err := controller.handler.service.GetChapter(query)

	if err != nil {
		return models.Assets{}
	}

	parts := strings.Split(query, "/")
	manga := parts[2]
	currChap := parts[3]

	currentIDX := 0

	for idx, chapter := range chapterData.ChapterListIds {
		if chapter.ID == currChap {
			currentIDX = len(chapterData.ChapterListIds) - idx
			break
		}
	}

	current := &models.LocalManga{
		ID:            manga,
		Title:         chapterData.Title,
		TotalChapter:  len(chapterData.ChapterListIds),
		LastChapter:   currentIDX,
		LastChapterID: currChap,
	}

	defer controller.UpdateManga(current)

	if err != nil {
		return models.Assets{}
	}

	return chapterData
}

func (controller *MangaController) SaveHistory() error {
	file, err := os.OpenFile(controller.path, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		return err
	}

	err = json.NewEncoder(file).Encode(controller.history)
	if err != nil {
		return err
	}

	return nil
}

func (controller *MangaController) UpdateManga(manga *models.LocalManga) error {

	if controller.cache["images"] != nil {
		manga.Image = controller.cache["images"][manga.ID]
	}

	controller.history.LastManga = manga

	if controller.history.Progress == nil {
		controller.history.Progress = make(map[string]*models.LocalManga)
	}

	controller.history.Progress[manga.ID] = manga
	return controller.SaveHistory()
}
