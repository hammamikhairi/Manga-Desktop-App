package servermanager

import (
	"fmt"
	types "mngapp/backend/Types"
	"net/http"
	"strconv"
)

// DONE

type ServerManager struct {
	EndPoints types.Endpoints
	Bg        string
	EPN       int
}

func ServerInit() *ServerManager {
	return &ServerManager{
		EndPoints: types.Endpoints{},
		EPN:       0,
	}
}

func (sm *ServerManager) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	index, _ := strconv.Atoi(r.URL.Path[1:])
	if index == 999 {
		http.ServeFile(w, r, sm.Bg)
		return
	}
	if index < 0 || index >= sm.EPN {
		// TODO : ERROR
		fmt.Fprint(w, "You fucked up")
	} else {
		http.ServeFile(w, r, string(sm.EndPoints[index]))
	}
}

// URLS SHOULD BE FULL PATHS
func (sm *ServerManager) SetData(newEndpoints types.Endpoints) {
	sm.EndPoints = newEndpoints
	sm.EPN = len(newEndpoints)
}

func (sm *ServerManager) SetBg(path string) {
	sm.Bg = path
}