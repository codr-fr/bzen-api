import Joi from 'joi'
import logger from './logger'

export interface ICommand {
  getSchema(): Joi.ObjectSchema
  handle(): void
  validateSchema(payload: object): void
  validate(): void
}

export abstract class AbstractCommand implements ICommand {
  abstract getSchema(): Joi.ObjectSchema
  abstract handle(): void

  constructor(payload: object) {
    this.validateSchema(payload)
  }

  validateSchema(payload: object): void {
    const validationResult: Joi.ValidationResult = this.getSchema().validate(payload)

    if (validationResult?.error) {
      logger.info(`${this.constructor.name} validateSchema error:  ${validationResult.error?.message}`)
      throw new Error(`${validationResult.error?.message}`)
    }
  }

  validate(): void {
    return
  }
}
