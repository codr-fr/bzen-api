import { IAggregator } from "../../../interface/aggregator";
import { IEvent } from "../../../interface/event";
import { ACCOUNT_CREATED_EVENT, IAccountCreatedEvent } from "../event/accountCreatedEvent";
import { ACCOUNT_CREDITED_EVENT, IAccountCreditedEvent } from "../event/accountCreditedEvent";
import { ACCOUNT_DEBITED_EVENT, IAccountDebitedEvent } from "../event/accountDebitedEvent";

export class AccountAggregator implements IAggregator {
    readonly id: string;
    currentBalance: number;
    estimatedBalance: number;

    constructor(id: string, currentBalance?: number, estimatedBalance?: number) {
        this.id = id
        this.currentBalance = currentBalance ?? 0
        this.estimatedBalance = estimatedBalance ?? 0
    }

    applyEvents(events: IEvent[]): AccountAggregator {
        events.map(event => this.applyEvent(event))
        return this
    }

    applyEvent(event: IEvent): AccountAggregator {
        switch (event.name) {
            case ACCOUNT_CREATED_EVENT:
                this.applyCreateAccountEvent(<IAccountCreatedEvent>event)
                break;

            case ACCOUNT_CREDITED_EVENT:
                this.applyCreditAccountEvent(<IAccountCreditedEvent>event)
                break;

            case ACCOUNT_DEBITED_EVENT:
                this.applyDebitAccountEvent(<IAccountDebitedEvent>event)
                break;
        }
        return this
    }

    private applyCreateAccountEvent(event: IAccountCreatedEvent) {
        this.currentBalance = event.payload.initialBalance
    }

    private applyCreditAccountEvent(event: IAccountCreditedEvent) {
        this.currentBalance += event.payload.amount
    }

    private applyDebitAccountEvent(event: IAccountDebitedEvent) {
        this.currentBalance -= event.payload.amount
    }
}
