import Joi from 'joi'
import { AbstractCommand } from '../../../framework/command'
import { saveEvent } from '../../../framework/event'
import { AccountCreditedEvent } from '../event/accountCreditedEvent'

interface Payload {
  accountId: string
  amount: number
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreditAccountCommand:
 *       type: object
 *       required:
 *         - accountId
 *         - amount
 *       properties:
 *         accountId:
 *           type: string
 *         amount:
 *           type: number
 *       example:
 *         accountId: x
 *         amount: 100
 */
export class CreditAccountCommand extends AbstractCommand {
  accountId: string
  amount: number

  constructor(payload: Payload) {
    super(payload)
    this.accountId = payload.accountId
    this.amount = payload.amount
  }

  getSchema() {
    return Joi.object({
      accountId: Joi.string().uuid().required(),
      amount: Joi.number().positive().required()
    })
  }

  async handle(): Promise<void> {
    const event = new AccountCreditedEvent(this.accountId, this.amount)
    await saveEvent(event)
  }
}
