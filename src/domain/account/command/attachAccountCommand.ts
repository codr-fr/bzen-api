import Joi from 'joi'
import { AbstractCommand } from '../../../framework/command'
import { saveEvent } from '../../../framework/event'
import { Role } from '../enums'
import { AccountAttachedEvent } from '../event/accountAttachedEvent'

interface Payload {
  accountId: string
  userId: string
  role: Role
}

/**
 * @openapi
 * components:
 *   schemas:
 *     AttachAccountCommand:
 *       type: object
 *       required:
 *         - accountId
 *         - userId
 *         - role
 *       properties:
 *         accountId:
 *           type: string
 *         userId:
 *           type: string
 *         role:
 *           type: string
 *           description: Role wanted (OWNER, READER, EDITOR)
 *       example:
 *         accountId: x
 *         userId: x
 *         role: OWNER
 */
export class AttachAccountCommand extends AbstractCommand {
  accountId: string
  userId: string
  role: Role

  constructor(payload: Payload) {
    super(payload)
    this.accountId = payload.accountId
    this.userId = payload.userId
    this.role = payload.role
  }

  getSchema() {
    return Joi.object({
      accountId: Joi.string().uuid().required(),
      userId: Joi.string().uuid().required(),
      role: Joi.string().required()
    })
  }

  async handle(): Promise<void> {
    const event = new AccountAttachedEvent(this.accountId, this.userId, this.role)
    await saveEvent(event)
  }
}
