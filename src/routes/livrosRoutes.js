import express  from 'express'
import LivroController from '../controllers/livroController.js'

const routes = express.Router()

routes
  .get('/livros', LivroController.listarLivros)
  .get('/livros/busca', LivroController.listarLivroPorEditora)
  .get('/livros/:id', LivroController.buscarLivroPorId)
  .post('/livros', LivroController.cadastrarLivro)
  .put('/livros/:id', LivroController.atualizarLivro)
  .delete('/livros/:id', LivroController.excluirLivro)

export default routes