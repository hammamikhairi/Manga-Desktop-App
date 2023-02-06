package conf

import (
	"encoding/json"
	"fmt"
	"mngapp/backend/utils"
	"os"
)

// DONE

// TODO :
//  - maybe add some stuff (theme ?)

const CONF_PATH_HEAD string = "/MngApp/conf.json"

type UserInfo struct {
	ConfFile  string `json:"ConfFile"`
	MangasDir string `json:"mangasDir"`
	DataDir   string `json:"dataDir"`
}

func Default() *UserInfo {
	homeDir, _ := os.UserHomeDir()
	confDir, _ := os.UserConfigDir()
	return &UserInfo{
		ConfFile:  confDir + CONF_PATH_HEAD,
		MangasDir: homeDir + "/mngApp/",
		// FIXME : this changes
		DataDir: homeDir + "/mngApp/Data",
	}
}

func (u *UserInfo) Load() {
	cfgData, err := os.ReadFile(u.ConfFile)

	if err != nil {
		return
	}

	json.Unmarshal(cfgData, &u)
}

func (u *UserInfo) CheckConfig() error {
	// fmt.Println(u.ConfFile)
	if utils.FileExists(u.ConfFile) {
		return nil
	}

	return fmt.Errorf("This Error")
}

func ConfInit() *UserInfo {

	user := Default()
	if err := user.CheckConfig(); err != nil {
		// no config -> init
		fmt.Println("here")
		confBase, _ := os.UserConfigDir()
		utils.MakeDir(confBase + "/MngApp")
		user.Save()
	} else {
		user.Load()
	}

	// checks
	utils.CheckDirectory(user.DataDir)
	utils.CheckDirectory(user.MangasDir)

	return user
}

func (u *UserInfo) Save() {
	cfgData, _ := json.MarshalIndent(u, "", "  ")

	err := os.WriteFile(u.ConfFile, cfgData, 0644)
	utils.Check(err)
}
