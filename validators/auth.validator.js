import { body, validationResult } from "express-validator";

//Validação da rota de login, checa se as credenciais estão formatadas corretamente.
export const loginValidator = [
    body('email').isEmail().withMessage('Credenciais inválidas.'),
    body('senha').notEmpty().withMessage('Credenciais inválidas.'),

    //Acabei esquecendo do handleValidationErro, vou retirar o bloco abaixo futuramente.
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error('Erro de validação.')
            error.statusCode = 400
            error.errors = errors.array()
            return next(error)
        }
        next()
    }
]