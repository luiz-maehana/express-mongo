import ErrorDefault from './DefaultError.js'

class CastErrors extends ErrorDefault {
  constructor(error) {
    super(`Um ou Mais Dados Fornecidos Estão Incorretos!: ${error}`, 400)
  }
}

export default CastErrors