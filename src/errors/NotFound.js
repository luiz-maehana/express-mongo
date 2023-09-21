import DefaultError from './DefaultError.js'

class NotFound extends DefaultError {
  constructor(message = 'Página Não Encontrada') {
    super(message, 404)
  }
}

export default NotFound