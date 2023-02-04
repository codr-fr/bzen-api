import db from '../database/mongoose'
import { AbstractAggregator, Aggregator } from './aggregator'
import { Event } from './event'

export async function findAll<T extends AbstractAggregator>(c: { new (is: string): T }): Promise<T[]> {
  await db()
  const events = await Event.find().exec()
  return new Aggregator(c).applyEvents(events).aggregators
}
