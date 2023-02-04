import { model, Schema } from 'mongoose'

export interface ISnapshot {
  date?: Date
  uuid: string
  name: string
  snapshot: object
}

const snapshotSchema = new Schema<ISnapshot>({
  date: { type: Date, default: Date.now },
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  snapshot: { type: Object, required: true }
})

export const Snapshot = model<ISnapshot>('Snapshot', snapshotSchema)
