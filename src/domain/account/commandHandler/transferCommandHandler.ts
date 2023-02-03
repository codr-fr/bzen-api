import { saveEvents } from '../../../model/event'
import { TransferCommand } from '../command/transferCommand'
import { AccountCreditedEvent } from '../event/accountCreditedEvent'
import { AccountDebitedEvent } from '../event/accountDebitedEvent'

export const transferCommandHandler = async (command: TransferCommand) => {
  const eventDebited = new AccountDebitedEvent(command.fromAccountId, command.amount)
  const eventCredited = new AccountCreditedEvent(command.toAccountId, command.amount)

  await saveEvents([eventDebited, eventCredited])
}
