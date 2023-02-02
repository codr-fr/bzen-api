import Joi from "joi"
import { ICommand } from "../../../interface/command"

export interface IDebitAccountCommand extends ICommand {
    uuid: string
    amount: number
}

const schema = Joi.object({
    uuid: Joi.string().uuid(),
    amount: Joi.number().positive()
})

export const creditAccountCommandValidate = (command: IDebitAccountCommand) => {
    const isValidateResult: Joi.ValidationResult = schema.validate(command)
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`)
    }
}