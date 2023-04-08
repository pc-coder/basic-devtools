package models

type Base64EncodeRequest struct {
	Payload string `json:"plainText"`
}

type Base64DecodeRequest struct {
	Payload string `json:"encodedValue"`
}
