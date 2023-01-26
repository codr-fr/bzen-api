import Joi from "joi";
import { ICommand } from "../../../interface/command";

export interface IDebitAccountCommand extends ICommand {
    uuid: string;
    amount: number;
}

export const debitAccountCommandSchema = Joi.object({
    uuid: Joi.string().uuid(),
    amount: Joi.number()
})

export const creditAccountCommandValidate = (command: IDebitAccountCommand) => {
    const isValidateResult: Joi.ValidationResult = debitAccountCommandSchema.validate(command);
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`);
    }
}