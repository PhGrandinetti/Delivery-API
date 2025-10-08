import express from 'express'
import { createUserValidation } from '../validators/users.validator.js'
import { handleValidationErrors } from '../middlewares/validation.middleware.js'
import userController from '../controllers/user.controller.js'

const router = express.Router()

router.post(
    '/',
    createUserValidation,
    handleValidationErrors,
    userController.create
)

export default router