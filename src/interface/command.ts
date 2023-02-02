import Joi from "joi"

export interface ICommand {
    getSchema(): Joi.ObjectSchema
    validate(): void
}