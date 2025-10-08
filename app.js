import express from 'express'
import userRouter from './routes/user.router.js'

const porta = 3000
const app = express()

app.use(express.json())

app.use('/api/user', userRouter)


app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})