import express  from 'express'
import AutorController from '../controllers/AutorController.js'
import paginate from '../middlewares/paginate.js'

const routes = express.Router()

routes
  .get('/autores', AutorController.listarAutores, paginate)
  .post('/autores', AutorController.cadastrarAutor)
  .get('/autores/:id', AutorController.buscarAutorPorId)
  .put('/autores/:id', AutorController.atualizarAutor)
  .delete('/autores/:id', AutorController.excluirAutor)

export default routes