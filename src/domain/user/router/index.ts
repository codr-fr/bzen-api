import express from 'express'
import { loginUser, registerUser, updateUser } from '../controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 */
export default express.Router().use('/user', router)

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserCommand'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.post('/', registerUser)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Require a jwt token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserCommand'
 *     responses:
 *       200: {}
 *       500: {}
 */
router.post('/login', loginUser)

/**
 * @swagger
 * /user/edit:
 *   post:
 *     summary: Update username
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserCommand'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.post('/edit', updateUser)
