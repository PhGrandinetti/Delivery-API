import express from 'express'
import MenuController from '../controllers/menu.controller.js'
import { menuIdValidation } from '../validators/menu.validator.js'
import { handleValidationErrors } from '../middlewares/validation.middleware.js'

const router = express.Router()

// -----------------
// ROTAS PUG (HTML)
// -----------------

// Página do cardápio (lista de itens)
router.get('/', MenuController.renderMenu)

// Página de detalhes de um item específico
router.get(
    '/:id',
    menuIdValidation,
    handleValidationErrors,
    MenuController.renderMenuItem
)

export default router