import { autor, livro } from '../models/index.js'
import NotFound from '../errors/NotFound.js'
import CastErrors from '../errors/CastErrors.js'

class LivroController {

  static async listarLivros(req, res, next) {
    try {
      let { limit = 10, page = 1, order = '_id:-1' } = req.query
      let [orderBy, orderAscDesc ] = order.split(':')
      limit = parseInt(limit)
      page = parseInt(page)
      orderAscDesc = parseInt(orderAscDesc)
      if (limit <= 0 || page <= 0) {
        next(new CastErrors())
      }
      const listaLivros = await livro.find()
        .sort({
          [orderBy]: orderAscDesc
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('autor')
        .exec()
      res.status(200).json(listaLivros)
    } catch (e) {
      next(e)
    }
  }

  static async buscarLivroPorId(req, res, next) {
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
      const livrosPorEditora = await livro.find(search).populate('autor')
      res.status(200).json(livrosPorEditora)
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