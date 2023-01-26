import { model, Schema } from "mongoose";
import { IEvent } from "../interface/event";

const eventSchema = new Schema<IEvent>({
    name: { type: String, required: true },
    command: { type: Object, required: true }
});

export const Event = model<IEvent>('Event', eventSchema);
