package api

import (
	"manelo/backend/api/service"
	"manelo/backend/models"
)

type MangaService struct {
	serverURL string
}

func NewMangaService(serverURL string) *MangaService {
	return &MangaService{serverURL: serverURL}
}

func (s *MangaService) SearchManga(query string) ([]models.SearchResult, error) {
	return service.SearchManga(s.serverURL, query)
}

func (s *MangaService) GetManga(id string) (models.MetaData, error) {
	return service.GetManga(s.serverURL, id)
}

func (s *MangaService) GetChapter(path string) (models.Assets, error) {

	return service.GetChapter(s.serverURL, path)

}
