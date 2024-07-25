package api

// import "backend/models"

type MangaHandler struct {
	service *MangaService
}

func NewMangaHandler(path, server string) *MangaHandler {
	return &MangaHandler{
		service: NewMangaService(server),
	}
}
