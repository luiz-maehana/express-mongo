import NotFound from '../errors/NotFound.js'
import { autor } from '../models/index.js'

class AutorController {

  static async listarAutores (req, res, next) {
    try {
      const listaAutores = await autor.find()
      res.status(200).json(listaAutores)
    } catch (e) {
      next(e)
    }
  }

  static async buscarAutorPorId (req, res, next) {
    try {
      const autorResultado = await autor.findById(req.params.id)
      if (autorResultado === null) {
        next(new NotFound('Autor Não Localizado!'))
      }
      res.status(200).json(autorResultado)
    } catch (e) {
      next(e)
    }
  }

  static async cadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body)
      res.status(201).json({
        message: 'Autor Criado com Sucesso!',
        autor: novoAutor
      })
    } catch (e) {
      next(e)
    }
  }

  static async atualizarAutor (req, res, next) {
    try {
      const autorResultado = await autor.findByIdAndUpdate(req.params.id, req.body)
      if (autorResultado === null) {
        next(new NotFound('Autor Não Localizado!'))
      } 
      res.status(200).json({
        message: 'Autor Atualizado com Sucesso',
      })
    } catch (e) {
      next(e)
    }
  }

  static async excluirAutor (req, res, next) {
    try {
      const autorResultado = await autor.findByIdAndDelete(req.params.id)
      if (autorResultado === null) {
        next(new NotFound('Autor Não Localizado!'))
      }
      res.status(200).json({
        message: 'Autor Excluido com Sucesso',
      })
    } catch (e) {
      next(e)
    }
  }
}

export default AutorController