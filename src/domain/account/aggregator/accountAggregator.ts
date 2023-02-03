import { AbstractAggregator } from "../../../interface/aggregator"
import { IEvent } from "../../../interface/event"
import { ACCOUNT_CREATED_EVENT, AccountCreatedEvent } from "../event/accountCreatedEvent"
import { ACCOUNT_CREDITED_EVENT, AccountCreditedEvent } from "../event/accountCreditedEvent"
import { ACCOUNT_DEBITED_EVENT, AccountDebitedEvent } from "../event/accountDebitedEvent"

export class AccountAggregator extends AbstractAggregator {
    readonly id: string
    currentBalance: number
    estimatedBalance: number

    constructor(id: string, currentBalance?: number, estimatedBalance?: number) {
        super()
        this.id = id
        this.currentBalance = currentBalance ?? 0
        this.estimatedBalance = estimatedBalance ?? 0
    }

    applyEvent(event: IEvent): this {
        switch (event.name) {
            case ACCOUNT_CREATED_EVENT:
                this.applyCreateAccountEvent(<AccountCreatedEvent>event)
                break

            case ACCOUNT_CREDITED_EVENT:
                this.applyCreditAccountEvent(<AccountCreditedEvent>event)
                break

            case ACCOUNT_DEBITED_EVENT:
                this.applyDebitAccountEvent(<AccountDebitedEvent>event)
                break
        }
        return this
    }

    private applyCreateAccountEvent(event: AccountCreatedEvent) {
        this.currentBalance = event.payload.initialBalance
    }

    private applyCreditAccountEvent(event: AccountCreditedEvent) {
        this.currentBalance += event.payload.amount
    }

    private applyDebitAccountEvent(event: AccountDebitedEvent) {
        this.currentBalance -= event.payload.amount
    }
}
