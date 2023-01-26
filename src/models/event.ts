import { model, Schema } from "mongoose";
import { IEvent } from "../interface/event";

const eventSchema = new Schema<IEvent>({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    payload: { type: Object, required: true }
});

export const Event = model<IEvent>('Event', eventSchema);
