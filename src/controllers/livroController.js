import livro from '../models/Livro.js'
import { autor } from '../models/Autor.js'

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find().populate('autor').exec()
      res.status(200).json(listaLivros)
    } catch (e) {
      next(e)
    }
  }

  static async buscarLivroPorId (req, res, next) {
    try {
      const livroBuscado = await livro.findById(req.params.id)
      res.status(200).json(livroBuscado)
    } catch (e) {
      next(e)
    }
  }

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor)
      const livroCompleto = {
        ...novoLivro, 
        autor: { ...autorEncontrado._doc }
      }
      const livroCriado = await livro.create(livroCompleto)
      res.status(201).json({
        message: 'Livro Criado com Sucesso!',
        livro: livroCriado
      })
    } catch (e) {
      next(e)
    }
  }

  static async atualizarLivro (req, res, next) {
    try {
      await livro.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        message: 'Livro Atualizado com Sucesso',
      })
    } catch (e) {
      next(e)
    }
  }

  static async excluirLivro (req, res, next) {
    try {
      await livro.findByIdAndDelete(req.params.id)
      res.status(200).json({
        message: 'Livro Excluido com Sucesso',
      })
    } catch (e) {
      next(e)
    }
  }

  static async listarLivroPorEditora (req, res, next) {
    const editora = req.query.editora
    try {
      const livrosPorEditora = await livro.find({ editora })
      res.status(200).json(livrosPorEditora)
    } catch (e) {
      next(e)
    }
  }
}

export default LivroController