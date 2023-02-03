import { AbstractAggregator } from '../../../interface/aggregator'
import { IEvent } from '../../../interface/event'
import { AccountAggregator } from './accountAggregator'

export class AccountsAggregator extends AbstractAggregator {
  aggregators: AccountAggregator[] = []

  applyEvent(event: IEvent): this {
    let aggregator = this.aggregators.find((aggregator) => aggregator.id === event.uuid)

    if (aggregator === undefined) {
      aggregator = new AccountAggregator(event.uuid)
      this.aggregators.push(aggregator)
    }

    aggregator.applyEvent(event)

    return this
  }
}
