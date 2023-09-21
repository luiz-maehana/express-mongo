import mongoose from 'mongoose'
import { autorSchema } from './Autor.js'

const livroSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  titulo: {
    type: String,
    required: [true, 'O Título do Livro É OBRIGATÓRIO!']
  },
  editora: {
    type: String,
    required: [true, 'O Nome da Editora É OBRIGATÓRIO!'],
    enum: {
      values: ['Casa do Código', 'Alura', 'Salve-Se Quem Puder'],
      message: 'A Editora \'{VALUE}\' Não É Um Valor Permitido'
    }
  },
  preco: {
    type: Number
  },
  paginas: {
    type: Number,
    min: [10, 'O Número de Páginas Deve Estar Entre 10 e 5000, Valor Fornecido: \'{VALUE}\''],
    max: [5000, 'O Número de Páginas Deve Estar Entre 10 e 5000, Valor Fornecido: \'{VALUE}\'']
  },
  autor: autorSchema
}, { versionKey: false })

const livro = mongoose.model('livros', livroSchema)

export default livro