package controller

import (
	"basic-devtools/models"
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/suite"
	"net/http"
	"net/http/httptest"
	"testing"
)

type Base64ControllerTestSuite struct {
	suite.Suite
	recorder         *httptest.ResponseRecorder
	context          *gin.Context
	mockController   *gomock.Controller
	base64Controller Base64Controller
}

func TestBase64Controller(t *testing.T) {
	suite.Run(t, new(Base64ControllerTestSuite))
}

func (suite *Base64ControllerTestSuite) SetupTest() {
	suite.recorder = httptest.NewRecorder()
	suite.context, _ = gin.CreateTestContext(suite.recorder)
	suite.mockController = gomock.NewController(suite.T())
	suite.base64Controller = NewBase64Controller()
}

func (suite *Base64ControllerTestSuite) TearDownTest() {
	suite.mockController.Finish()
}

func (suite *Base64ControllerTestSuite) Test_Encode() {
	base64EncodeRequestBody := models.Base64EncodeRequest{
		Payload: "Abc@202111",
	}
	expectedBase64EncodeResponseBody := models.Base64EncodeResponse{
		TransformedPayload: "QWJjQDIwMjExMQ==",
	}
	requestAsString, err := json.Marshal(base64EncodeRequestBody)
	suite.Nil(err)
	suite.context.Request, _ = http.NewRequest(http.MethodPost, "/", bytes.NewBufferString(string(requestAsString)))

	suite.base64Controller.Encode(suite.context)

	suite.Equal(http.StatusOK, suite.recorder.Code)
	expectedResponseBody, err := json.Marshal(expectedBase64EncodeResponseBody)
	suite.Nil(err)
	suite.Equal(string(expectedResponseBody), suite.recorder.Body.String())
}

func (suite *Base64ControllerTestSuite) Test_Decode() {
	base64EncodeRequestBody := models.Base64DecodeRequest{
		Payload: "QWJjQDIwMjExMQ==",
	}
	expectedBase64EncodeResponseBody := models.Base64DecodeResponse{
		TransformedPayload: "Abc@202111",
	}
	requestAsString, err := json.Marshal(base64EncodeRequestBody)
	suite.Nil(err)
	suite.context.Request, _ = http.NewRequest(http.MethodPost, "/", bytes.NewBufferString(string(requestAsString)))

	suite.base64Controller.Decode(suite.context)

	suite.Equal(http.StatusOK, suite.recorder.Code)
	expectedResponseBody, err := json.Marshal(expectedBase64EncodeResponseBody)
	suite.Nil(err)
	suite.Equal(string(expectedResponseBody), suite.recorder.Body.String())
}
