import { saveEvent } from '../../../model/event'
import { CreditAccountCommand } from '../command/creditAccountCommand'
import { AccountCreditedEvent } from '../event/accountCreditedEvent'

export const creditAccountCommandHandler = async (command: CreditAccountCommand) => {
  const event = new AccountCreditedEvent(command.accountId, command.amount)
  await saveEvent(event)
}
