import { IEvent } from "../../../interface/event";
import { IDebitAccountCommand } from "../command/debitAccountCommand";

export interface IAccountDebitedEvent extends IEvent {
    command: IDebitAccountCommand;
}