import { autor, livro } from '../models/index.js'
import NotFound from '../errors/NotFound.js'

class LivroController {

  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find()
      req.result = buscaLivros
      next()
    } catch (e) {
      next(e)
    }
  }

  static async buscarLivroPorId(req, res, next) {
    try {
      const livroResultado = await livro.findById(req.params.id)
      if (livroResultado === null) {
        next(new NotFound('Livro Não Localizado!'))
      }
      res.status(200).json(livroResultado)
    } catch (e) {
      next(e)
    }
  }

  static async cadastrarLivro(req, res, next) {
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

  static async atualizarLivro(req, res, next) {
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

  static async excluirLivro(req, res, next) {
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

  static async listarLivroPorFiltro(req, res, next) {
    try {
      const search = await mountSearch(req.query)
      if (search === null) {
        res.status(200).send([])
      }
      const livrosResultado = livro.find(search)
      req.result = livrosResultado
      next()
    } catch (e) {
      next(e)
    }
  }
}

async function mountSearch(params) {

  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params
  let search = {}

  if (minPaginas || maxPaginas) search.paginas = {}

  if (editora) search.editora = editora
  if (titulo) search.titulo = { $regex: titulo, $options: 'i' }
  if (minPaginas) search.paginas.$gte = minPaginas
  if (maxPaginas) search.paginas.$lte = maxPaginas
  if (nomeAutor) {
    const autorResultado = await autor.findOne({ nome: nomeAutor })
    if (autorResultado === null) {
      search = null
    } else {
      search.autor = autorResultado._id
    }
  }
  return search
}

export default LivroController