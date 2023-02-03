import Joi from 'joi'

export interface ICommand {
  getSchema(): Joi.ObjectSchema
  validateSchema(payload: object): void
  validate(): void
}

export abstract class AbstractCommand implements ICommand {
  abstract getSchema(): Joi.ObjectSchema

  constructor(payload: object) {
    this.validateSchema(payload)
  }

  validateSchema(payload: object): void {
    const validationResult: Joi.ValidationResult = this.getSchema().validate(payload)

    if (validationResult?.error) {
      throw new Error(`${validationResult.error?.message}`)
    }
  }

  validate(): void {
    return
  }
}
