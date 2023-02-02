import { model, Schema } from "mongoose"
import { IEvent } from "../interface/event"

const eventSchema = new Schema<IEvent>({
    date: { type: Date, default: Date.now },
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    payload: { type: Object, required: true }
})

export const Event = model<IEvent>('Event', eventSchema)
