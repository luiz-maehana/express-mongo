import ErrorDefault from './DefaultError.js'

class CastErrors extends ErrorDefault {
  constructor(message = 'Um ou Mais Dados Fornecidos Estão Incorretos!') {
    super(message, 400)
  }
}

export default CastErrors