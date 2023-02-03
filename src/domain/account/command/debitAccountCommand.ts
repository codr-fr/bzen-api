import Joi from 'joi'
import { AbstractCommand } from '../../../interface/command'
import { saveEvent } from '../../../model/event'
import { AccountDebitedEvent } from '../event/accountDebitedEvent'

interface Payload {
  accountId: string
  amount: number
}

export class DebitAccountCommand extends AbstractCommand {
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
    const event = new AccountDebitedEvent(this.accountId, this.amount)
    await saveEvent(event)
  }
}
