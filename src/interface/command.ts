import Joi from "joi"

export interface ICommand {
    getSchema(): Joi.ObjectSchema
    validate(): void
}

export abstract class AbstractCommand implements ICommand {
    abstract getSchema(): Joi.ObjectSchema

    async validate(): Promise<void> {
        const isValidateResult: Joi.ValidationResult = this.getSchema().validate(this)

        if (isValidateResult?.error) {
            throw new Error(`${isValidateResult.error?.message}`)
        }
    }        
}