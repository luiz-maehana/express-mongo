import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

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
      values: ['Casa do Código', 'Alura', 'Salve-Se Quem Puder', 'Clássicos'],
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
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'autores',
    required: [true, 'O(a) autor(a) É OBRIGATÓRIO!'],
    autopopulate: { select: 'nome' }
  }
}, { versionKey: false })

livroSchema.plugin(autopopulate)

const livro = mongoose.model('livros', livroSchema)

export default livro