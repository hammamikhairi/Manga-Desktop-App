package models

import (
	"encoding/json"
	"manelo/backend/constants"
	"os"
)

func LocaleInit(path string) {
	locale := Locale{
		LastManga: nil,
		Progress:  nil,
	}
	file, err := json.MarshalIndent(locale, "", "  ")
	if err != nil {
		panic(err)
	}

	err = os.WriteFile(path+constants.REPO_FILE, file, 0644)
	if err != nil {
		panic(err)
	}
}
