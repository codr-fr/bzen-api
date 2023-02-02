import Joi from "joi"
import { ICommand } from "../../../interface/command"

export interface ICreateAccountCommand extends ICommand {
    initialBalance: number
}

const createAccountCommandSchema = Joi.object({
    initialBalance: Joi.number().required()
})

export const createAccountCommandValidate = (command: ICreateAccountCommand) => {
    const isValidateResult: Joi.ValidationResult = createAccountCommandSchema.validate(command)
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`)
    }
}