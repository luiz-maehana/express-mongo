import { autor } from '../models/Autor.js'

class AutorController {

  static async listarAutores (req, res) {
    try {
      const listaAutores = await autor.find({})
      res.status(200).json(listaAutores)
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Buscar a Lista de Autores!`,
      })
    }
  }

  static async buscarAutorPorId (req, res) {
    try {
      const autorBuscado = await autor.findById(req.params.id)
      res.status(200).json(autorBuscado)
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Buscar o Autor!`,
      })
    }
  }

  static async cadastrarAutor (req, res) {
    try {
      const novoAutor = await autor.create(req.body)
      res.status(201).json({
        message: 'Autor Criado com Sucesso!',
        autor: novoAutor
      })
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Criar um Autor!`,
      })
    }
  }

  static async atualizarAutor (req, res) {
    try {
      await autor.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        message: 'Autor Atualizado com Sucesso',
      })
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Atualizar o Autor!`,
      })
    }
  }

  static async excluirAutor (req, res) {
    try {
      await autor.findByIdAndDelete(req.params.id)
      res.status(200).json({
        message: 'Autor Excluido com Sucesso',
      })
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Excluir o Autor!`,
      })
    }
  }
}

export default AutorController