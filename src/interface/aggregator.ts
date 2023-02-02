import { IEvent } from "./event"

export interface IAggregator {
    toObject(filter?: object): object
    applyEvent(event: IEvent): IAggregator
    applyEvents(events: IEvent[]): IAggregator
}

export abstract class AbstractAggregator implements IAggregator {
    abstract applyEvent(event: IEvent): IAggregator

    applyEvents(events: IEvent[]): AbstractAggregator {
        events.map(event => this.applyEvent(event))
        return this
    }

    toObject(filters?: string[]) {
        const result: {[key: string]: any} = {...this}
        filters?.forEach(f => delete result[f])
        return result
    }
}