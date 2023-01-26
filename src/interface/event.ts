import { ICommand } from "./command";

export interface IEvent {
    uuid: string;
    name: string;
    command: ICommand;
}