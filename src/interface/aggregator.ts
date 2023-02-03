import { IEvent } from './event'

export interface IAggregator {
  toObject(filter?: object): object
  applyEvent(event: IEvent): this
  applyEvents(events: IEvent[]): this
}

export abstract class AbstractAggregator implements IAggregator {
  abstract applyEvent(event: IEvent): this

  applyEvents(events: IEvent[]): this {
    events.map((event) => this.applyEvent(event))
    return this
  }

  toObject(filters?: string[]): object {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { [key: string]: any } = { ...this }
    filters?.forEach((f) => delete result[f])
    return result
  }
}
