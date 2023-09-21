import mongoose from 'mongoose'
import { autorSchema } from './Autor.js'

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: [ true, 'O Título do Livro É OBRIGATÓRIO!' ] },
  editora: { type: String, required: [ true, 'O Nome da Editora É OBRIGATÓRIO!' ] },
  preco: { type: Number },
  paginas: { type: Number },
  autor: autorSchema
}, { versionKey: false })

const livro = mongoose.model('livros', livroSchema)

export default livro