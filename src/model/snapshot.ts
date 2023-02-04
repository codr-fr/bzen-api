import { model, Schema } from 'mongoose'
import { ISnapshot } from '../interface/snapshot'

const snapshotSchema = new Schema<ISnapshot>({
  date: { type: Date, default: Date.now },
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  snapshot: { type: Object, required: true }
})

export const Snapshot = model<ISnapshot>('Snapshot', snapshotSchema)
