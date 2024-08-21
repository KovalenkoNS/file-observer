package main

import (
	"fmt"
	"net/http"
	"os"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func getFile(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	dat, err := os.ReadFile("data.json")
	if err != nil {
		_, err = w.Write([]byte(err.Error()))
		if err != nil {
			fmt.Println("Error to respond with error: ", err.Error())
			return
		}
		return
	}

	_, err = w.Write(dat)
	if err != nil {
		fmt.Println("Error to respond with data: ", err.Error())
	}
}

func main() {
	fs := http.FileServer(http.Dir("./file-shower/build"))

	http.Handle("/", fs)

	http.HandleFunc("/file", getFile)

	_ = http.ListenAndServe(":8090", nil)
}
