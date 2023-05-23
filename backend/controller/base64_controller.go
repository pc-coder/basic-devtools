package controller

import (
	"basic-devtools/models"
	"basic-devtools/utils/logging"
	"encoding/base64"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Base64Controller interface {
	Encode(ctx *gin.Context)
	Decode(ctx *gin.Context)
}

type base64Controller struct {
}

func (b base64Controller) Encode(ctx *gin.Context) {
	log := logging.GetLogger()
	var reqPayload models.Base64EncodeRequest

	decodeError := ctx.ShouldBindJSON(&reqPayload)
	if decodeError != nil {
		log.Error("Failed to bind request. Error : ", decodeError)
		return
	}

	response := models.Base64EncodeResponse{
		TransformedPayload: base64.StdEncoding.EncodeToString([]byte(reqPayload.Payload)),
	}
	ctx.JSON(http.StatusOK, response)
}

func (b base64Controller) Decode(ctx *gin.Context) {
	log := logging.GetLogger()
	var reqPayload models.Base64DecodeRequest

	decodeError := ctx.ShouldBindJSON(&reqPayload)
	if decodeError != nil {
		log.Error("Failed to bind request. Error : ", decodeError)
		return
	}

	decodedData, err := base64.StdEncoding.DecodeString(reqPayload.Payload)
	if err != nil {
		log.Error("Failed to bind request. Error : ", decodeError)

	}
	ctx.JSON(http.StatusOK, models.Base64DecodeResponse{TransformedPayload: string(decodedData)})
}

func NewBase64Controller() Base64Controller {
	return &base64Controller{}
}
