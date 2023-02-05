import Joi from 'joi'
import { AbstractCommand } from '../../../framework/command'
import { saveEvents } from '../../../framework/event'
import { AccountCreditedEvent } from '../event/accountCreditedEvent'
import { AccountDebitedEvent } from '../event/accountDebitedEvent'

interface Payload {
  fromAccountId: string
  toAccountId: string
  amount: number
}

/**
 * @openapi
 * components:
 *   schemas:
 *     TransferCommand:
 *       type: object
 *       required:
 *         - fromAccountId
 *         - toAccountId
 *         - amount
 *       properties:
 *         fromAccountId:
 *           type: string
 *         toAccountId:
 *           type: string
 *         amount:
 *           type: number
 *       example:
 *         fromAccountId: x
 *         toAccountId: x
 *         amount: 100
 */
export class TransferCommand extends AbstractCommand {
  fromAccountId: string
  toAccountId: string
  amount: number

  constructor(payload: Payload) {
    super(payload)
    this.fromAccountId = payload.fromAccountId
    this.toAccountId = payload.toAccountId
    this.amount = payload.amount
  }

  getSchema() {
    return Joi.object({
      fromAccountId: Joi.string().uuid().required(),
      toAccountId: Joi.string().uuid().required(),
      amount: Joi.number().positive().required()
    })
  }

  async handle(): Promise<void> {
    const eventDebited = new AccountDebitedEvent(this.fromAccountId, this.amount)
    const eventCredited = new AccountCreditedEvent(this.toAccountId, this.amount)

    await saveEvents([eventDebited, eventCredited])
  }
}
