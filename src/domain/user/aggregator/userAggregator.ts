import { IAggregator } from "../../../interface/aggregator";
import { IEvent } from "../../../interface/event";
import { UserRegistredEvent, USER_REGISTRED_EVENT } from "../event/userRegistredEvent";

export class UserAggregator implements IAggregator {
    readonly id: string;
    username: string = '';
    password: string = '';

    constructor(id: string) {
        this.id = id
    }

    applyEvents(events: IEvent[]): UserAggregator {
        events.map(event => this.applyEvent(event))
        return this
    }

    applyEvent(event: IEvent): UserAggregator {
        switch (event.name) {
            case USER_REGISTRED_EVENT:
                this.applyRegisterUserEvent(<UserRegistredEvent>event)
                break;
        }
        return this
    }

    private applyRegisterUserEvent(event: UserRegistredEvent) {
        this.username = event.payload.username
        this.password = event.payload.password
    }
}
