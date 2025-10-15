import express from 'express'
import { createUserValidation, updateUserValidation, userIdValidation } from '../validators/users.validator.js'
import { handleValidationErrors } from '../middlewares/validation.middleware.js'
import UserController from '../controllers/user.controller.js'
import { checkRole } from '../middlewares/permission.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()


//ROTAS GET
router.get(
    '/',
    authMiddleware,
    checkRole('admin'),
    userIdValidation,
    handleValidationErrors,
    UserController.getAll
)

router.get(
    '/:id',
    authMiddleware,
    checkRole('admin'),
    userIdValidation,
    handleValidationErrors,
    UserController.getById
)

//ROTAS POST
router.post(
    '/',
    createUserValidation,
    handleValidationErrors,
    UserController.create
)

//ROTAS PATCH
router.patch(
    '/:id',
    authMiddleware,
    updateUserValidation,
    handleValidationErrors,
    UserController.update
)

//ROTAS - DELETE
router.delete(
    '/:id',
    authMiddleware,
    userIdValidation,
    handleValidationErrors,
    UserController.delete.bind(UserController)
)
export default router