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
router.post(
    '/',
    authMiddleware,
    checkRole('admin'),
    createMenuValidator,
    handleValidationErrors,
    MenuController.create
)

//ROTAS PATCH
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
    MenuController.delete.bind(MenuController)
)


export default router