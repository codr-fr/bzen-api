import { IEvent } from './event'

export interface IAggregator {
  readonly id: string
  toObject(filter?: object): object
  supportedEvents(): string[]
  applyEvent(event: IEvent): void
  applyEvents(events: IEvent[]): void
}

export abstract class AbstractAggregator implements IAggregator {
  readonly id: string

  abstract supportedEvents(): string[]

  constructor(id: string) {
    this.id = id
  }

  applyEvent(event: IEvent): void {
    if (!this.supportedEvents().includes(event.name)) {
      throw new Error(`${event.name} not supported by ${this.constructor.name}`)
    }
  }

  applyEvents(events: IEvent[]): void {
    events.filter((event) => this.supportedEvents().includes(event.name)).forEach((event) => this.applyEvent(event))
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
  private events: string[] = []

  constructor(private generic: new (id: string) => T) {
    super(`Aggregator:${generic.name}`)
  }

  supportedEvents(): string[] {
    if (this.events.length === 0) {
      this.events = new this.generic('').supportedEvents()
    }

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
