import {param,body} from 'express-validator'

export const createUserValidation = [
    body('nome')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório.')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/) // matche de nome garantindo que seja somente letra e com a acentução do portugues
        .withMessage('Nome deve um texto com apenas letras e espaços.'),

    body('email')
        .normalizeEmail()
        .isEmail().withMessage('Email inválido.'),
    
    body('senha')
        .notEmpty().withMessage('Senha é obrigatório.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        .withMessage('A senha deve conter pelo menos um(a) letra/número.')
        .isLength({min: 5}).withMessage('A senha deve ter no mínimo 5 caracteres.'),
    
    body('endereco')
        .notEmpty().withMessage('Endereço é obrigatório.')
        .isLength({min:5}).withMessage('Insira um endereço válido.'),

    body('contato')
        .notEmpty().withMessage('Contato obrigatório')
        .isMobilePhone('pt-BR').withMessage('Número de telefone inválido.'),
     
    body('role').optional()
]

export const userIdValidation = [
    param('id')
        .optional().isUUID().withMessage('ID inválido.'),
]

export const updateUserValidation = [
    param('id')
        .isUUID().withMessage('Id inválido.'),
    
    body('nome').optional()
        .trim()
        .notEmpty().withMessage('Nome é obrigatório.')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/) // matche de nome garantindo que seja somente letra e com a acentução do portugues
        .withMessage('Nome deve um texto com apenas letras e espaços.'),

    body('email').optional()
        .normalizeEmail()
        .isEmail().withMessage('Email inválido.'),
    
    body('senha').optional()
        .notEmpty().withMessage('Senha é obrigatório.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        .withMessage('A senha deve conter pelo menos um(a) letra/número.')
        .isLength({min: 5}).withMessage('A senha deve ter no mínimo 5 caracteres.'),
    
    body('endereco').optional()
        .notEmpty().withMessage('Endereço é obrigatório.')
        .isLength({min:5}).withMessage('Insira um endereço válido.'),

    body('contato').optional()
        .notEmpty().withMessage('Contato obrigatório')
        .isMobilePhone('pt-BR').withMessage('Número de telefone inválido.'),
     
    body('role').optional()
]