import express from 'express'
import { checkRole } from '../middlewares/permission.middleware.js'
import MenuController from '../controllers/menu.controller.js'
import { handleValidationErrors } from '../middlewares/validation.middleware.js'
import { createMenuValidator, menuIdValidation, updateMenuValidator } from '../validators/menu.validator.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

// ------------------
// ROTAS JSON (API)
// ------------------

//ROTAS GET
router.get(
    '/',
    MenuController.getAll
)

router.get(
    '/:id',
    menuIdValidation,
    handleValidationErrors,
    MenuController.getById
)

//ROTAS POST

//Rota de criação de itens.
router.post(
    '/',
    authMiddleware,
    checkRole('admin'),
    createMenuValidator,
    handleValidationErrors,
    MenuController.create
)

//ROTAS PATCH

//Rota de alterar usuário.
router.patch(
    '/:id',
    authMiddleware,
    checkRole('admin'),
    updateMenuValidator,
    handleValidationErrors,
    MenuController.update     
)

//ROTAS DELETE
router.delete(
    '/:id',
    authMiddleware,
    checkRole('admin'),
    menuIdValidation,
    handleValidationErrors,
    MenuController.delete.bind(MenuController) //Mantém a referência correta do this.
)

// -----------------
// ROTAS PUG(HTML)
// -----------------

// Página do cardápio
router.get(
    '/view',
    MenuController.renderMenu
);

// Página de detalhes de um item
router.get(
    '/view/:id',
    menuIdValidation,
    handleValidationErrors,
    MenuController.renderMenuItem
);

export default router