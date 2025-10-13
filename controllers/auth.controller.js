import AuthService from '../services/auth.service.js'

class AuthController {
    static async login(req,res,next){
        try{
            const {email,senha} = req.body
            const result = await AuthService.login({email,senha})
            res.status(200).json({
                message: 'Login realizado com sucesso.',
                ...result
            })
        } catch (error){
            next(error)
        }
    }
}

export default AuthController