import Joi from "joi"
import { ICommand } from "../../../interface/command"

export interface ICreditAccountCommand extends ICommand {
    uuid: string
    amount: number
}

const creditAccountCommandSchema = Joi.object({
    uuid: Joi.string().uuid(),
    amount: Joi.number().positive()
})

export const creditAccountCommandValidate = (command: ICreditAccountCommand) => {
    const isValidateResult: Joi.ValidationResult = creditAccountCommandSchema.validate(command)
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`)
    }
}