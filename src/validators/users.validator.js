import {param,body} from 'express-validator'
import mongoose from 'mongoose'

//Validação dos dados fornecidos na criação de usuários.
export const createUserValidation = [
    body('nome')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório.')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/) // matche de nome garantindo que seja somente letra e com a acentução do portugues
        .withMessage('Nome deve um texto com apenas letras e espaços.'),

    body('email')
        .normalizeEmail()
        .isEmail().withMessage('Email inválido.'),
    
    body('senha')
        .notEmpty().withMessage('Senha é obrigatório.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)// matche garantindo que a senha deve ter pelo menos um/uma numero/letra
        .withMessage('A senha deve conter pelo menos um(a) letra/número.')
        .isLength({min: 5}).withMessage('A senha deve ter no mínimo 5 caracteres.'),
    
    body('endereco')
        .trim()
        .notEmpty().withMessage('Endereço é obrigatório.')
        .isLength({min:5}).withMessage('Insira um endereço válido.'),

    body('contato')
        .notEmpty().withMessage('Contato obrigatório')
        .isMobilePhone('pt-BR').withMessage('Número de telefone inválido.'),
     
]

//Validação do ID de usuários.
export const userIdValidation = [
    param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage('ID inválido.')
]

//Validação dos dados fornecidos na alteração de usuários.
export const updateUserValidation = [
    
    body('nome')
        .optional()
        .trim()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/) // matche de nome garantindo que seja somente letra e com a acentução do portugues
        .withMessage('Nome deve um texto com apenas letras e espaços.'),

    body('email')
        .optional()
        .normalizeEmail()
        .isEmail().withMessage('Email inválido.'),
    
    body('senha').optional()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        .withMessage('A senha deve conter pelo menos um(a) letra/número.')
        .isLength({min: 5}).withMessage('A senha deve ter no mínimo 5 caracteres.'),
    
    body('endereco')
        .trim()
        .optional()
        .isLength({min:5}).withMessage('Insira um endereço válido.'),

    body('contato')
        .optional()
        .isMobilePhone('pt-BR').withMessage('Número de telefone inválido.'),
     
]