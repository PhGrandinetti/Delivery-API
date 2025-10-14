import { validationResult } from "express-validator"

export const handleValidationErrors = (req,res,next)=> {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const error = new Error('Erro de Validação')
        error.statusCode = 400
        return next(error)
    }

    next()
}