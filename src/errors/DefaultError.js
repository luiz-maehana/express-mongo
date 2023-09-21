class DefaultError extends Error {
  constructor(message = 'Erro Interno do Servidor', status = 500) {
    super()
    this.message = message
    this.status = status
  }

  sendResponse(res) {
    res.status(this.status).send({
      message: this.message,
      status: this.status
    })
  }
}

export default DefaultError