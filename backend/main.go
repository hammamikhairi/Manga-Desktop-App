package backend

import (
	"manelo/backend/api"
	"manelo/backend/config"
	"manelo/backend/constants"
)

func BackInit(serviceURL string) (*config.ConfigManager, *api.MangaController) {
	// fmt.Println("Starting server...")
	configManager := config.NewConfigManager(serviceURL)
	controller := api.NewMangaController(configManager.Config.UserConfigPath+constants.REPO_FILE, configManager.Config.ServerURL)

	return configManager, controller
}
