import { model, Schema } from "mongoose";

// 1. Create interfaces
export interface IPayload {

}

export interface IEvent {
    name: string;
    payload: IPayload;
}

// 2. Create a Schema corresponding to the document interface.
const eventSchema = new Schema<IEvent>({
    name: { type: String, required: true },
    payload: { type: Object, required: true }
});

// 3. Create a Model.
export const Event = model<IEvent>('Event', eventSchema);
