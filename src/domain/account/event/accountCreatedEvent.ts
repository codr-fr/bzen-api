import { IEvent } from "../../../interface/event";
import { ICreateAccountCommand } from "../command/createAccountCommand";

export interface IAccountCreatedEvent extends IEvent {
    command: ICreateAccountCommand;
}