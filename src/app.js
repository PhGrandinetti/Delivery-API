import express from 'express'
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.router.js'
import menuRouter from './routes/menu.router.js'
import viewsMenuRouter from './routes/view-menu.router.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'
import { env } from './config/env.js'
import {connectDB} from './config/dataBase.js'
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


// Middleware para JSON e Formulários
//=================================================================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//=================================================================

// Configuração do PUG
//=================================================================
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
//=================================================================


// Rotas API
//=================================================================
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/menu', menuRouter)
//=================================================================

//Rotas Pug/templates
//=================================================================
app.use('/menu', viewsMenuRouter)
//=================================================================

// Middleware de tratamento de erros
//=================================================================
app.use(globalErrorHandler)
//=================================================================

// Conexão com o MongoDB e inicialização do servidor
//=================================================================
connectDB().then(() => {
    app.listen(env.porta, () => {
        console.log(`Servidor rodando na porta ${env.porta}`)
    })
})
//=================================================================