import { AbstractAggregator } from "../../../interface/aggregator"
import { IEvent } from "../../../interface/event"
import { UserAggregator } from "./userAggregator"

export class UsersAggregator extends AbstractAggregator {
    users: UserAggregator[] = []

    applyEvent(event: IEvent): UsersAggregator {
        let userAggregator = this.users.find(aggregator => aggregator.id === event.uuid)

        if(userAggregator === undefined) {
            userAggregator = new UserAggregator(event.uuid)
            this.users.push(userAggregator)
        }

        userAggregator.applyEvent(event)

        return this
    }
}
