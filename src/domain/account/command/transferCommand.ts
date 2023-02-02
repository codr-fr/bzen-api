import Joi from "joi"
import { ICommand } from "../../../interface/command"

export interface ITransferCommand extends ICommand {
    fromUuid: string
    toUuid: string
    amount: number
}

const schema = Joi.object({
    fromUuid: Joi.string().uuid(),
    toUuid: Joi.string().uuid(),
    amount: Joi.number().positive()
})

export const transferCommandValidate = (command: ITransferCommand) => {
    const isValidateResult: Joi.ValidationResult = schema.validate(command)
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`)
    }
}