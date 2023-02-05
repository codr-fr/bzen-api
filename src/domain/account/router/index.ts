import express from 'express'
import {
  attachAccountToUser,
  createAccount,
  creditAccount,
  debitAccount,
  detachAccountToUser,
  getAccount,
  // getUserAccounts,
  transferBetweenAccounts
} from '../controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: The account managing API
 */
export default express.Router().use('/account', router)

//router.get('/', getUserAccounts)

/**
 * @swagger
 * /account/{accountId}:
 *   get:
 *     tags: [Account]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:accountId', getAccount)

/**
 * @swagger
 * /account:
 *   post:
 *     tags: [Account]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', createAccount)

/**
 * @swagger
 * /account/credit:
 *   post:
 *     tags: [Account]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/credit', creditAccount)

/**
 * @swagger
 * /account/debit:
 *   post:
 *     tags: [Account]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/debit', debitAccount)

/**
 * @swagger
 * /account/transfer:
 *   post:
 *     tags: [Account]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/transfer', transferBetweenAccounts)

/**
 * @swagger
 * /account/attach:
 *   post:
 *     tags: [Account]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/attach', attachAccountToUser)

/**
 * @swagger
 * /account/detach:
 *   post:
 *     tags: [Account]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/detach', detachAccountToUser)
