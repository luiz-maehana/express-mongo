import CastErrors from './CastErrors.js'

class ValidationErrors extends CastErrors {
  constructor(error) {
    const errorsMessage = Object.values(error.errors).map(error => error.message).join('; ')
    super(`Houve um erro de Validação de Dados: ${errorsMessage}`)
  }
}

export default ValidationErrors