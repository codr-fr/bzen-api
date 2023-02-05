import Joi from 'joi'
import { AbstractCommand } from '../../../framework/command'
import { saveEvent } from '../../../framework/event'
import { AccountDetachedEvent } from '../event/accountDettachedEvent'

interface Payload {
  accountId: string
  userId: string
}

/**
 * @openapi
 * components:
 *   schemas:
 *     DetachAccountCommand:
 *       type: object
 *       required:
 *         - accountId
 *         - userId
 *       properties:
 *         accountId:
 *           type: string
 *         userId:
 *           type: string
 *       example:
 *         accountId: x
 *         userId: x
 */
export class DetachAccountCommand extends AbstractCommand {
  accountId: string
  userId: string

  constructor(payload: Payload) {
    super(payload)
    this.accountId = payload.accountId
    this.userId = payload.userId
  }

  getSchema() {
    return Joi.object({
      accountId: Joi.string().uuid().required(),
      userId: Joi.string().uuid().required()
    })
  }

  async handle(): Promise<void> {
    const event = new AccountDetachedEvent(this.accountId, this.userId)
    await saveEvent(event)
  }
}
