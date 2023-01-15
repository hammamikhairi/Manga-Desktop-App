package main

import (
	"context"
	"fmt"
	wsr "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
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