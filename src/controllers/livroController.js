import livro from '../models/Livro.js'
import { autor } from '../models/Autor.js'

class LivroController {

  static async listarLivros (req, res) {
    try {
      const listaLivros = await livro.find({})
      res.status(200).json(listaLivros)
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Buscar a Lista de Livros!`,
      })
    }
  }

  static async buscarLivroPorId (req, res) {
    try {
      const livroBuscado = await livro.findById(req.params.id)
      res.status(200).json(livroBuscado)
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Buscar o Livro!`,
      })
    }
  }

  static async cadastrarLivro (req, res) {
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
      res.status(500).json({
        message: `${e.message} - Falha ao Criar um Livro!`,
      })
    }
  }

  static async atualizarLivro (req, res) {
    try {
      await livro.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        message: 'Livro Atualizado com Sucesso',
      })
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Atualizar o Livro!`,
      })
    }
  }

  static async excluirLivro (req, res) {
    try {
      await livro.findByIdAndDelete(req.params.id)
      res.status(200).json({
        message: 'Livro Excluido com Sucesso',
      })
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Excluir o Livro!`,
      })
    }
  }

  static async listarLivroPorEditora (req, res) {
    const editora = req.query.editora
    try {
      const livrosPorEditora = await livro.find({ editora })
      res.status(200).json(livrosPorEditora)
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Falha ao Buscar o Livro por Editora!`,
      })
    }
  }
}

export default LivroController