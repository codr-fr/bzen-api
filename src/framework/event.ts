import { model, Schema } from 'mongoose'
import db from '../database/mongoose'
import logger from './logger'

export interface IEvent {
  date?: Date
  uuid: string
  name: string
  payload: object
}

const eventSchema = new Schema<IEvent>({
  date: { type: Date, default: Date.now },
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  payload: { type: Object, required: true }
})

export const Event = model<IEvent>('Event', eventSchema)

export const saveEvents = async (events: IEvent[]) => {
  await db()

  Event.insertMany(events).catch((err) => {
    logger.error(`Error while inserting event ${err}`)
    throw new Error('Error!')
  })
}

export const saveEvent = async (event: IEvent) => {
  await saveEvents([event])
}
