import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import bcrypt from 'bcrypt'
import UserRepository from '../repositories/user.repository.js'

class AuthService {
    async login({email,senha}){
        const user = await UserRepository.findByEmail(email)

        if(!user){
            const error = new Error('Credenciais inválidas.')
            error.statusCode = 401
            throw error
        }

        const matchSenha = await bcrypt.compare(senha, user.senha)

        if(!matchSenha){
            const error = new Error('Credenciais inválidas.')
            error.statusCode = 401
            throw error
        }

        const payload = {
            id: user.id,
                email: user.email,
                role: user.role
        }

        const token = jwt.sign(
            payload,
            env.jwtSecret,
            {
                expiresIn: env.jwtExpiresIn,
            }
        )

        return {token}
    }

}

export default AuthService