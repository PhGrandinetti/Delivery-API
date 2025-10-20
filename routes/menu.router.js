import express from 'express'
import { checkRole } from '../middlewares/permission.middleware.js'
import MenuController from '../controllers/menu.controller.js'
import { handleValidationErrors } from '../middlewares/validation.middleware.js'
import { createMenuValidator, menuIdValidation, updateMenuValidator } from '../validators/menu.validator.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()


//ROTAS GET
router.get(
    '/',
    menuIdValidation,
    handleValidationErrors,
    MenuController.getAll
)

router.get(
    '/:id',
    menuIdValidation,
    handleValidationErrors,
    MenuController.getById
)

//ROTAS POST

//Rota de criação de usuários.
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
    MenuController.delete.bind(MenuController) //O codigo reconhecia o delete como "this.delete", ai esse foi jeito que achei.
)


export default router