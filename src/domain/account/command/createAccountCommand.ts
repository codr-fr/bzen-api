import Joi from 'joi'
import { v4 } from 'uuid'
import { AbstractCommand } from '../../../framework/command'
import { saveEvents } from '../../../framework/event'
import { Role } from '../enums'
import { AccountAttachedEvent } from '../event/accountAttachedEvent'
import { AccountCreatedEvent } from '../event/accountCreatedEvent'

interface Payload {
  userId: string
  initialBalance: number
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAccountCommand:
 *       type: object
 *       required:
 *         - userId
 *         - initialBalance
 *       properties:
 *         userId:
 *           type: string
 *         initialBalance:
 *           type: number
 *       example:
 *         userId: x
 *         initialBalance: 100
 */
export class CreateAccountCommand extends AbstractCommand {
  userId: string
  initialBalance: number

  constructor(payload: Payload) {
    super(payload)
    this.userId = payload.userId
    this.initialBalance = payload.initialBalance
  }

  getSchema() {
    return Joi.object({
      userId: Joi.string().uuid().required(),
      initialBalance: Joi.number().required()
    })
  }

  async handle(): Promise<void> {
    const uuid = v4()

    const eventCreated = new AccountCreatedEvent(uuid, this.initialBalance)
    const eventAttached = new AccountAttachedEvent(uuid, this.userId, Role.Owner)

    await saveEvents([eventCreated, eventAttached])
  }
}
