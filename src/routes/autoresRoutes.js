import express  from 'express'
import AutorController from '../controllers/AutorController.js'

const routes = express.Router()

routes.get('/autores', AutorController.listarAutores)
routes.post('/autores', AutorController.cadastrarAutor)
routes.get('/autores/:id', AutorController.buscarAutorPorId)
routes.put('/autores/:id', AutorController.atualizarAutor)
routes.delete('/autores/:id', AutorController.excluirAutor)

export default routes