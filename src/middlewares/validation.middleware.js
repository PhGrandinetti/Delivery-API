import { validationResult } from "express-validator"

//Middleware responsável por checar se as validações foram atendidas.
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}