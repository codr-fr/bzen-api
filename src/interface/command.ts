import Joi from "joi"

export interface ICommandPayload {

}

export interface ICommand {
    getSchema(): Joi.ObjectSchema
    validateSchema(payload: ICommandPayload): void
    validate(): void
}

export abstract class AbstractCommand implements ICommand {
    abstract getSchema(): Joi.ObjectSchema

    constructor(payload: ICommandPayload) {
        this.validateSchema(payload)
    }

    validateSchema(payload: ICommandPayload): void {
        const validationResult: Joi.ValidationResult = this.getSchema().validate(payload)

        if (validationResult?.error) {
            throw new Error(`${validationResult.error?.message}`)
        }
    }

    async validate(): Promise<void> {

    }
}