package servermanager

import (
	"fmt"
	"net/http"
	"strconv"
)

type ServerManager struct {
	EndPoints []string
	EPN       int
}

func ServerInit() *ServerManager {
	return &ServerManager{
		EndPoints: []string{},
		EPN:       0,
	}
}

func (sm *ServerManager) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	index, _ := strconv.Atoi(r.URL.Path[1:])
	if index < 0 || index >= sm.EPN {
		fmt.Fprint(w, "You fucked up")
	} else {
		http.ServeFile(w, r, sm.EndPoints[index])
	}
}

// URLS SHOULD BE FULL PATHS
func (sm *ServerManager) SetData(newEndpoints []string) {
	sm.EndPoints = newEndpoints
	sm.EPN = len(newEndpoints)
}