import { IAggregator } from "../../../interface/aggregator";
import { IEvent } from "../../../interface/event";
import { UserAggregator } from "./userAggregator";

export class UsersAggregator implements IAggregator {
    users: UserAggregator[] = []

    applyEvents(events: IEvent[]): UsersAggregator {
        events.map(event => this.applyEvent(event))
        return this
    }

    applyEvent(event: IEvent): UsersAggregator {
        let userAggregator = this.users.find(aggregator => aggregator.id === event.uuid)

        if(userAggregator === undefined) {
            userAggregator = new UserAggregator(event.uuid)
            this.users.push(userAggregator)
        }

        userAggregator.applyEvent(event);

        return this
    }
}
