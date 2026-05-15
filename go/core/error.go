package core

type AdressApiFranceError struct {
	IsAdressApiFranceError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAdressApiFranceError(code string, msg string, ctx *Context) *AdressApiFranceError {
	return &AdressApiFranceError{
		IsAdressApiFranceError: true,
		Sdk:              "AdressApiFrance",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AdressApiFranceError) Error() string {
	return e.Msg
}
