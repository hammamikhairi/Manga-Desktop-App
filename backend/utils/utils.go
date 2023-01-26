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
	fmt.Println(dirPath)
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		MakeDir(dirPath)
	}
}

func MakeDir(path string) {
	fmt.Println("making : ", path)
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
