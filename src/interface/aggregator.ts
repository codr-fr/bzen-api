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

export class Aggregator<T extends AbstractAggregator> extends AbstractAggregator {
  aggregators: T[] = []

  constructor(private generic: new (id: string) => T, private events: string[]) {
    super(`Aggregator:${generic.name}`)
  }

  supportedEvents(): string[] {
    return this.events
  }

  applyEvent(event: IEvent): this {
    let aggregator = this.aggregators.find((aggregator) => aggregator.id === event.uuid)

    if (aggregator === undefined) {
      aggregator = new this.generic(event.uuid)
      this.aggregators.push(aggregator)
    }

    aggregator.applyEvent(event)

    return this
  }
}
