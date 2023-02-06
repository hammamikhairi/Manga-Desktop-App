package managers

import (
	// "fmt"
	data "mngapp/backend/DataManager"
	download "mngapp/backend/DownloadManager"
	server "mngapp/backend/ServerManager"
	types "mngapp/backend/Types"
	config "mngapp/backend/conf"
	"net/http"
)

type Managers struct {
	DataM           *data.DataManager
	ServerM         *server.ServerManager
	DownloadManager *download.DownloadManager
	UserInfo        *config.UserInfo
}

func ManagersInit() *Managers {
	tempInfo := config.ConfInit()
	return &Managers{
		DataM:           data.DMInit(tempInfo.DataDir, tempInfo.MangasDir),
		ServerM:         server.ServerInit(),
		DownloadManager: download.DLMInit(tempInfo.DataDir, tempInfo.MangasDir),
		UserInfo:        tempInfo,
	}
}

func (mg *Managers) GetData() types.MangasData {
	return *mg.DataM.GetAll()
}

var managers *Managers

func DownloadManagerTests() {
	// Data Manager
	managers.DownloadManager.DownloadChapter(types.Chapter{
		Pages: types.Pages{
			"https://reead-narutoshippuden-manga.com/images/nFentNsMV8EJGuz3rthx1638364578.jpg",
			"https://reead-narutoshippuden-manga.com/images/nFentNsMV8EJGuz3rthx1638364578.jpg",
			"https://reead-narutoshippuden-manga.com/images/woiMdQSXaEyWVRIAAFXG1638364596.jpg",
			"https://reead-narutoshippuden-manga.com/images/ftSvTFavvfXgFbju0Z9a1638399685.jpg",
			"https://reead-narutoshippuden-manga.com/images/nFentNsMV8EJGuz3rthx1638364578.jpg",
		},
		PagesLength: 5,
		Ids: types.Ids{
			MngId:  "cains",
			ChapId: "chap 99",
		},
	})
}

func ServerTests() {
	// Extract Data using Data Manager
	managers.ServerM.SetData(types.Endpoints{
		"/home/khairi/mngApp/jjk/chap 1/0.jpg",
		"/home/khairi/mngApp/jjk/chap 1/1.jpg",
		"/home/khairi/mngApp/jjk/chap 1/2.jpg",
		"/home/khairi/mngApp/jjk/chap 1/3.jpg",
		"/home/khairi/mngApp/jjk/chap 1/4.jpg",
	})

	http.Handle("/", managers.ServerM)
	http.ListenAndServe(":8080", nil)
}
