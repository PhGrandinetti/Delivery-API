import express from 'express'
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.router.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'
import { authMiddleware } from './middlewares/auth.middleware.js'
import { env } from './config/env.js'

const app = express()

app.use(express.json())

app.use('/api/user', authMiddleware, userRouter)
app.use('/api/auth', authRouter)

app.use(globalErrorHandler)

app.listen(env.porta, () => {
    console.log(`Servidor rodando na porta ${env.porta}`)
})