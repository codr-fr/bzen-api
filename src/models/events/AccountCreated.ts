import { IEvent, IPayload } from "../event";

export interface IPayloadAccountCreated extends IPayload {
    id: string;
    balance: number;
}

export interface IEventAccountCreated extends IEvent {
    payload: IPayloadAccountCreated;
}