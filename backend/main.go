package main

import (
	"basic-devtools/constants"
	"basic-devtools/controller"
	"github.com/gin-contrib/static"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/healthz", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"status": "up"}) })

	base64Controller := controller.NewBase64Controller()

	toolsRoute := r.Group("/api/basic-devtools/v1/")
	{
		toolsRoute.POST("base64/encode", base64Controller.Encode)
		toolsRoute.POST("base64/decode", base64Controller.Decode)
	}

	// Serve frontend static files
	r.Use(static.Serve("/", static.LocalFile("./build", true)))
	r.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.RequestURI, "/app") {
			c.File("./build/index.html")
		}
		//default 404 page not found
	})

	err := r.Run(constants.ServerPort)
	if err != nil {
		log.Fatalln("Failed to start server on ", constants.ServerPort, ". Error : ", err)
	}
}
