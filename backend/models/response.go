package models

type Base64EncodeResponse struct {
	TransformedPayload string `json:"encodedValue"`
}

type Base64DecodeResponse struct {
	TransformedPayload string `json:"plainText"`
}
