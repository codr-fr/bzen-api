import { saveEvent } from '../../../model/event'
import { DebitAccountCommand } from '../command/debitAccountCommand'
import { AccountDebitedEvent } from '../event/accountDebitedEvent'

export const debitAccountCommandHandler = async (command: DebitAccountCommand) => {
  const event = new AccountDebitedEvent(command.accountId, command.amount)
  await saveEvent(event)
}
