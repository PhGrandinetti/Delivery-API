import express from 'express'
import AuthController from '../controllers/auth.controller.js'
import { loginValidator } from '../validators/auth.validator.js'

const router = express.Router()

router.post(
    '/login',
    loginValidator,
    AuthController.login
)

export default router