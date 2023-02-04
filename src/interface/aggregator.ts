import { IEvent } from './event'

export interface IAggregator {
  readonly id: string
  toObject(filter?: object): object
  supportedEvents(): string[]
  applyEvent(event: IEvent): this
  applyEvents(events: IEvent[]): this
}

export abstract class AbstractAggregator implements IAggregator {
  readonly id: string
  abstract applyEvent(event: IEvent): this
  abstract supportedEvents(): string[]

  constructor(id: string) {
    this.id = id
  }

  applyEvents(events: IEvent[]): this {
    events.filter((event) => this.supportedEvents().includes(event.name)).forEach((event) => this.applyEvent(event))
    return this
  }

  toObject(filters?: string[]): object {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { [key: string]: any } = { ...this }
    filters?.forEach((f) => delete result[f])
    return result
  }
}
