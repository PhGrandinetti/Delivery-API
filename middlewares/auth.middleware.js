import jwt from 'jsonwebtoken'
import {env} from '../config/env.js'

export const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader){
        const error = new Error('Token não recebido.')
        error.statusCode = 401
        throw error
    }

    const parts = authHeader.split(' ')
    if(parts.length !== 2){
        const error = new Error('Erro no formato do token.')
        error.statusCode = 401
        throw error
    }

    const [scheme,token] = parts
    if(!/^Bearer$/i.test(scheme)){
        const error = new Error('Token mal formatado.')
        error.statusCode = 401
        throw error
    }

    try{
        const decoded = jwt.verify(token, env.jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        next(error)
    }
}