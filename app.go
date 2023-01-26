package main

import (
	"context"
	"fmt"
	"log"

	wsr "github.com/wailsapp/wails/v2/pkg/runtime"

	"net/http"
	"os"
)

func handleRequest(w http.ResponseWriter, r *http.Request) {
	buf, err := os.ReadFile("/home/khairi/Pictures/test.jpg")

	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "image/png")
	w.Write(buf)
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	handler := http.HandlerFunc(handleRequest)

	http.Handle("/image", handler)

	fmt.Println("Server started at port 8080")
	go http.ListenAndServe(":8080", nil)
	// fmt.Println(os.UserConfigDir())
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Prompt() string {
	fmt.Println("here!")
	selection, err := wsr.OpenDirectoryDialog(a.ctx, wsr.OpenDialogOptions{
		Title:            "It's your turn!",
		DefaultDirectory: "/home/khairi/",
	})

	if err != nil {
		panic("nik")
	}

	fmt.Println(selection)

	return selection
}

func (a *App) Dl() string {

	// :)

	return ""
}
