import { autor, livro } from '../models/index.js'
import NotFound from '../errors/NotFound.js'

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
      const livroResultado = await livro.findById(req.params.id).populate('autor', 'nome').exec()
      if (livroResultado === null) {
        next(new NotFound('Livro Não Localizado!'))
      }
      res.status(200).json(livroResultado)
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
      const livroResultado = await livro.findByIdAndUpdate(req.params.id, req.body)
      if (livroResultado === null) {
        next(new NotFound('Livro Não Localizado!'))
      }
      res.status(200).json({
        message: 'Livro Atualizado com Sucesso',
      })
    } catch (e) {
      next(e)
    }
  }

  static async excluirLivro (req, res, next) {
    try {
      const livroResultado = await livro.findByIdAndDelete(req.params.id)
      if (livroResultado === null) {
        next(new NotFound('Livro Não Localizado!'))
      }
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