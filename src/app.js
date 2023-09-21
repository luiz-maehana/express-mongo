import express  from 'express'
import conectaNaDataBase from './config/dbConnect.js'
import routes from './routes/index.js' 
import errorsHandle from './middlewares/errorsHandle.js'

const conexao = await conectaNaDataBase()

conexao.on('error', (erro) => {
  console.error('Erro de Conexão:', erro)
})

conexao.once('open', () => {
  console.log('Conexão com o Banco Feita com Sucesso!')
})

const app = express()
routes(app)

app.use(errorsHandle)

export default app