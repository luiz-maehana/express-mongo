import mongoose from 'mongoose'

const autorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: {
    type: String,
    required: [true, 'O Nome do(a) Autor(a) É OBRIGATÓRIO!']
  },
  nacionalidade: { type: String },
}, { versionKey: false })

const autor = mongoose.model('autores', autorSchema)

export default autor