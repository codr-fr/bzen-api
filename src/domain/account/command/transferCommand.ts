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
