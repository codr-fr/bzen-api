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
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', registerUser)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Try to login to get a fresh JWT Token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserCommand'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT Token
 *       400:
 *         $ref: '#/components/responses/Error'
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
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/edit', updateUser)
