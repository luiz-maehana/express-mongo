import express  from 'express'
import LivroController from '../controllers/livroController.js'
import paginate from '../middlewares/paginate.js'

const routes = express.Router()

routes
  .get('/livros', LivroController.listarLivros, paginate)
  .get('/livros/busca', LivroController.listarLivroPorFiltro, paginate)
  .get('/livros/:id', LivroController.buscarLivroPorId)
  .post('/livros', LivroController.cadastrarLivro)
  .put('/livros/:id', LivroController.atualizarLivro)
  .delete('/livros/:id', LivroController.excluirLivro)

export default routes