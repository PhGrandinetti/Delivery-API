import express from 'express'
import userRouter from './routes/user.router.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'

const porta = 3000
const app = express()

app.use(express.json())

app.use('/api/user', userRouter)

app.use(globalErrorHandler)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})