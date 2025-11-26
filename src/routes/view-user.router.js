import express from 'express'
import UserController from '../controllers/user.controller.js'
import {userIdValidation} from '../validators/users.validator.js'
import { handleValidationErrors } from '../middlewares/validation.middleware.js'

const router = express.Router()

// -----------------
// ROTAS PUG (HTML)
// -----------------

// Página do cardápio (lista de itens)
router.get('/', UserController.renderUsers)

// Página de detalhes de um item específico
router.get(
    '/:id',
    userIdValidation,
    handleValidationErrors,
    UserController.renderUser
)

export default router