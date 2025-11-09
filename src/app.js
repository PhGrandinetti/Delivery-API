import express from 'express'
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.router.js'
import menuRouter from './routes/menu.router.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'
import { env } from './config/env.js'

const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/menu', menuRouter)

app.use(globalErrorHandler)

app.listen(env.porta, () => {
    console.log(`Servidor rodando na porta ${env.porta}`)
})