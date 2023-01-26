package conf

import (
	"encoding/json"
	"mngapp/backend/utils"
	"os"
)

type MangaProgress map[string]string

type UserInfo struct {
	MangasList    []string `json:"mangaList"`
	MangaProgress `json:"mangaProgress"`

	OutFile   string `json:"outFile"`
	MangasDir string `json:"mangasDir"`
	DataDir   string `json:"dataDir"`
	LastManga string `json:"lastManga"`
}

func Default() *UserInfo {
	homeDir, _ := os.UserHomeDir()
	utils.CheckDirectory(homeDir + "/mngApp")
	//! this chages
	utils.CheckDirectory(homeDir + "/mngApp/Data")

	return &UserInfo{
		OutFile:   homeDir + "/mngApp/conf",
		MangasDir: homeDir + "/mngApp/",
		//! this chages
		DataDir:       homeDir + "/mngApp/Data",
		LastManga:     "",
		MangasList:    []string{"csm"},
		MangaProgress: MangaProgress{"csm": "1"},
	}
}

func (u *UserInfo) Load() {
	cfgData, err := os.ReadFile(u.OutFile)

	if err != nil {
		return
	}

	json.Unmarshal(cfgData, &u)
}

func AppInit() *UserInfo {
	user := Default()
	user.Load()
	return user
}

func (u *UserInfo) Save() {
	cfgData, _ := json.MarshalIndent(u, "", "  ")

	utils.CheckDirectory(u.MangasDir)
	err := os.WriteFile(u.OutFile, cfgData, 0644)
	utils.Check(err)
}

func (u *UserInfo) AddManga(manga string) {
	u.MangasList = append(u.MangasList, manga)
	// ! remmeber this initial isnt always 0
	u.MangaProgress[manga] = "Chapter 0"
	u.Save()
}

func (u *UserInfo) SaveLastManga(manga string) {
	u.LastManga = manga
	u.Save()
}

func (u *UserInfo) UpdateManga(manga string, read string) {
	u.MangaProgress[manga] = read
	u.Save()
}
