import mongoose from 'mongoose'

function errorsHandle(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      message: 'Um ou Mais Dados Fornecidos Estão Incorretos!',
    })
  } else {
    res.status(500).json({
      message: `Falha na Requisição: ${error.message}`,
    })
  }
}

export default errorsHandle