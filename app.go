package main

import (
	"context"
	"fmt"
	"net/http"

	managers "mngapp/backend"
	types "mngapp/backend/Types"
)

// App struct
type App struct {
	ctx context.Context
	*managers.Managers
}

// NewApp creates a new App application
func NewApp() *App {
	return &App{
		Managers: managers.ManagersInit(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// initialize Server
	http.Handle("/", a.ServerM)
	go http.ListenAndServe(":8080", nil)
}

// get last manga
func (a *App) GetLastManga() types.MangaMetaData {
	// return "nig"
	res := a.Managers.GetLastManga()
	fmt.Println(res)
	return res
}

// func (a *App) Prompt() string {
// 	fmt.Println("here!")
// 	selection, err := wsr.OpenDirectoryDialog(a.ctx, wsr.OpenDialogOptions{
// 		Title:            "It's your turn!",
// 		DefaultDirectory: "/home/khairi/",
// 	})

// 	if err != nil {
// 		panic("nictx
// 	}
// initialize Server

// 	fmt.Printl(selection)

// }
// 	return selection
