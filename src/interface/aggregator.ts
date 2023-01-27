import { IEvent } from "./event"

export interface IAggregator {
    applyEvent(event: IEvent): IAggregator;
    applyEvents(events: IEvent[]): IAggregator;
}