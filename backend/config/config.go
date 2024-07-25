package config

import (
	"encoding/json"
	"manelo/backend/constants"
	"manelo/backend/models"
	"os"
)

type Config struct {
	UserConfigPath string `json:"userConfigPath"`
	ServerURL      string `json:"serverURL"`
}

func DefaultConfig(serviceURL string) Config {

	// system conf

	confPath, err := os.UserConfigDir()

	if err != nil {
		panic(err)
	}

	if _, err := os.Stat(confPath + "\\" + constants.APP_NAME); os.IsNotExist(err) {
		err = os.MkdirAll(confPath+"\\"+constants.APP_NAME, 0755)
		if err != nil {
			panic(err)
		}
	}

	return Config{
		UserConfigPath: confPath + "\\" + constants.APP_NAME,
		ServerURL:      serviceURL,
	}
}

type ConfigManager struct {
	Config Config
}

func NewConfigManager(serviceURL string) *ConfigManager {
	config := DefaultConfig(serviceURL)

	if _, err := os.Stat(config.UserConfigPath + constants.CONFIG_FILE); os.IsNotExist(err) {
		configManager := &ConfigManager{Config: config}
		configManager.SaveConfig()
		models.LocaleInit(configManager.Config.UserConfigPath)
		return configManager
	}

	configManager := &ConfigManager{}
	configManager.LoadConfig(config.UserConfigPath + constants.CONFIG_FILE)
	return configManager

}

func (cm *ConfigManager) LoadConfig(path string) {
	file, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(file, &cm.Config)
	if err != nil {
		panic(err)
	}
}

func (cm *ConfigManager) SaveConfig() {
	file, err := json.MarshalIndent(cm.Config, "", "  ")
	if err != nil {
		panic(err)
	}

	err = os.WriteFile(cm.Config.UserConfigPath+constants.CONFIG_FILE, file, 0644)
	if err != nil {
		panic(err)
	}
}
