import { IEvent } from "../../../interface/event";
import { ICreditAccountCommand } from "../command/creditAccountCommand";

export interface IAccountCreditedEvent extends IEvent {
    command: ICreditAccountCommand;
}