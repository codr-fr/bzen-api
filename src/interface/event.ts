import { ICommand } from "./command";

export interface IEvent {
    name: string;
    command: ICommand;
}