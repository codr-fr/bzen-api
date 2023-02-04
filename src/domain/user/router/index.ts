import express from 'express'
import { loginUser, registerUser, updateUser } from '../controller'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/edit', updateUser)

export default router
