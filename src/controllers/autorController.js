import { autor } from '../models/Autor.js'

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
      const autorBuscado = await autor.findById(req.params.id)
      if (autorBuscado !== null) {
        res.status(200).json(autorBuscado)
      } else {
        res.status(404).json({
          message: 'Autor Não Localizado!',
        })
      }
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
      await autor.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        message: 'Autor Atualizado com Sucesso',
      })
    } catch (e) {
      next(e)
    }
  }

  static async excluirAutor (req, res, next) {
    try {
      await autor.findByIdAndDelete(req.params.id)
      res.status(200).json({
        message: 'Autor Excluido com Sucesso',
      })
    } catch (e) {
      next(e)
    }
  }
}

export default AutorController