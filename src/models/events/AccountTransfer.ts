import { IEvent, IPayload } from "../event";

export interface IPayloadAccountTransfered extends IPayload {
    fromId: string;
    toId: string;
    amount: number;
}

export interface IEventAccountTransfered extends IEvent {
    payload: IPayloadAccountTransfered;
}