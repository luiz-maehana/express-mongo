import express  from 'express'
import conectaNaDataBase from './config/dbConnect.js'
import routes from './routes/index.js' 
import HandleErrors from './middlewares/handleErrors.js'
import Handle404 from './middlewares/handle404.js'

const conexao = await conectaNaDataBase()

conexao.on('error', (erro) => {
  console.error('Erro de Conexão:', erro)
})

conexao.once('open', () => {
  console.log('Conexão com o Banco Feita com Sucesso!')
})

const app = express()
routes(app)

app.use(Handle404)

app.use(HandleErrors)

export default app