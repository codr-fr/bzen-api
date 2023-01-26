import Joi from "joi";
import { ICommand } from "../../../interface/command";

export interface ICreateAccountCommand extends ICommand {
    id: string;
    balance: number;
}

export const createAccountCommandSchema = Joi.object({
    id: Joi.string().uuid(),
    balance: Joi.number()
})

export const createAccountCommandValidate = (command: ICreateAccountCommand) => {
    const isValidateResult: Joi.ValidationResult = createAccountCommandSchema.validate(command);
    if (isValidateResult?.error) {
      throw new Error(`${isValidateResult.error?.message}`);
    }
}