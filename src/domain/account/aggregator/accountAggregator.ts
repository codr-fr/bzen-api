import { AbstractAggregator } from '../../../framework/aggregator'
import { IEvent } from '../../../framework/event'
import { Role } from '../enums'
import { ACCOUNT_ATTACHED_EVENT, AccountAttachedEvent } from '../event/accountAttachedEvent'
import { ACCOUNT_CREATED_EVENT, AccountCreatedEvent } from '../event/accountCreatedEvent'
import { ACCOUNT_CREDITED_EVENT, AccountCreditedEvent } from '../event/accountCreditedEvent'
import { ACCOUNT_DEBITED_EVENT, AccountDebitedEvent } from '../event/accountDebitedEvent'
import { ACCOUNT_DETACHED_EVENT, AccountDetachedEvent } from '../event/accountDettachedEvent'

export class AccountAggregator extends AbstractAggregator {
  currentBalance: number
  estimatedBalance: number
  permissions: { [key: string]: Role } = {}

  constructor(id: string, currentBalance?: number, estimatedBalance?: number) {
    super(id)
    this.currentBalance = currentBalance ?? 0
    this.estimatedBalance = estimatedBalance ?? 0
  }

  supportedEvents(): string[] {
    return [
      ACCOUNT_ATTACHED_EVENT,
      ACCOUNT_CREATED_EVENT,
      ACCOUNT_CREDITED_EVENT,
      ACCOUNT_DEBITED_EVENT,
      ACCOUNT_DETACHED_EVENT
    ]
  }

  applyEvent(event: IEvent): this {
    super.applyEvent(event)

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

      case ACCOUNT_ATTACHED_EVENT:
        this.applyAttachAccountEvent(<AccountAttachedEvent>event)
        break

      case ACCOUNT_DETACHED_EVENT:
        this.applyDetachAccountEvent(<AccountDetachedEvent>event)
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

  private applyAttachAccountEvent(event: AccountAttachedEvent) {
    this.permissions[event.payload.userId] = event.payload.role
  }

  private applyDetachAccountEvent(event: AccountDetachedEvent) {
    delete this.permissions[event.payload.userId]
  }
}
