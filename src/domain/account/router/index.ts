import express from 'express'
import {
  attachAccountToUser,
  createAccount,
  creditAccount,
  debitAccount,
  detachAccountToUser,
  getAccount,
  getUserAccounts,
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

router.get('/', getUserAccounts)
router.get('/:accountId', getAccount)
router.post('/', createAccount)
router.post('/credit', creditAccount)
router.post('/debit', debitAccount)
router.post('/transfer', transferBetweenAccounts)
router.post('/attach', attachAccountToUser)
router.post('/detach', detachAccountToUser)
