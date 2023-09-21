import mongoose from 'mongoose'

mongoose.Schema.Types.String.set('validate', {
  validator: (value) => value.trim() !== '',
  message: ({ path }) => `O Campo '${path}' está em Branco!`
})