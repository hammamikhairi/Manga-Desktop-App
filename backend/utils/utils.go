package utils

import (
	"fmt"
	"os"
	"strings"
)

func Check(e error) {
	if e != nil {
		panic(e)
	}
}

func CheckDirectory(dirPath string) {
	// fmt.Println(dirPath)
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		MakeDir(dirPath)
	}
}

func DirExists(dirPath string) bool {
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		return false
	}
	return true
}

func FileExists(path string) bool {
	return DirExists(path)
}

func MakeDir(path string) {

	if DirExists(path) {
		return
	}
	// fmt.Println("making : ", path)
	err := os.Mkdir(path, os.ModePerm)
	Check(err)
}

func GetPageName(pageN int, url string) string {
	splitArray := strings.Split(url, ".")

	if len(splitArray) == 0 {
		return fmt.Sprintf("%d.png", pageN)
	}

	return fmt.Sprintf("%d.%s", pageN, splitArray[len(splitArray)-1])
}
