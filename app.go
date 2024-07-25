package main

import (
	"context"
	"fmt"

	"manelo/backend"
	"manelo/backend/api"
	"manelo/backend/config"
	"manelo/backend/models"
)

// App struct
type App struct {
	ctx context.Context

	*config.ConfigManager
	*api.MangaController
}

const SERVICE_URL = "I CAN'T TELL YOU :)"

// NewApp creates a new App application
func NewApp() *App {

	configManager, controller := backend.BackInit(SERVICE_URL)

	return &App{
		ConfigManager:   configManager,
		MangaController: controller,
	}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// get last manga
func (a *App) GetLastManga() models.LastMangaResponse {
	return a.MangaController.GetLastManga()
}

// get local list
func (a *App) GetLocalList() models.ProgressResponse {
	return a.MangaController.GetMangaList()
}

// search manga
func (a *App) SearchManga(query string) models.SearchResponse {
	return a.MangaController.SearchManga(query)
}

// get mlanga data
func (a *App) GetManga(query string) (models.MetaData, error) {
	return a.MangaController.GetManga(query)
}

// get chapter
func (a *App) GetChapter(query string) models.Assets {
	return a.MangaController.GetChapter(query)
}
