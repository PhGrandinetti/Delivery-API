import { param, body } from "express-validator";

export const createMenuValidator = [
    body('nome')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório.')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/) // matche garantindo que seja somente letra e com a acentução do portugues
        .withMessage('Nome deve um texto com apenas letras e espaços.'),

    body('ingredientes')
        .trim()
        .notEmpty().withMessage('Ingredientes é obrigatório.')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;()\-:#]+$/) // matche garantindo o uso de letras, números e alguns caracteres
        .withMessage('Os ingredientes devem ser um texto com apenas letras e espaços.'),

    body('preco')
        .trim()
        .notEmpty().withMessage('Preço é obrigatório.')
        .matches(/^R\$ ?\d{1,3}(\.\d{3})*(,\d{2})$/) // Garantindo que utilize o padrão brasileiro de preço
        .withMessage('Preço inválido. Use o formato R$ 0,00'),

    body('observacoes')
        .trim()
        .optional()
        .isString()
        .withMessage('Observações devem ser texto.'),
]

export const menuIdValidation = [
    param('id')
        .isUUID().withMessage('ID inválido.'),
]

export const updateMenuValidator = [
    param('id')
        .isUUID().withMessage('ID inválido.'),

    body('nome')
        .trim()
        .optional()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/) // matche garantindo que seja somente letra e com a acentução do portugues
        .withMessage('Nome deve um texto com apenas letras e espaços.'),

    body('ingredientes')
        .trim()
        .optional()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;()\-:#]+$/) // matche garantindo o uso de letras, números e alguns caracteres
        .withMessage('Os ingredientes devem ser um texto com apenas letras e espaços.'),

    body('preco')
        .trim()
        .optional()
        .matches(/^R\$ ?\d{1,3}(\.\d{3})*(,\d{2})$/) // Garantindo que utilize o padrão brasileiro de preço
        .withMessage('Preço inválido. Use o formato R$ 0,00'),

    body('observacoes')
        .trim()
        .optional()
        .isString()
        .withMessage('Observações devem ser texto.'),
]