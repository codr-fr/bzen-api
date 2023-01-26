import { IEvent } from "../../../interface/event";
import { ICreateAccountCommand } from "../command/createAccountCommand";
import { ACCOUNT_OPEN_EVENT } from "../event";

export interface AccountAggregator {
    id: string;
    currentBalance: number;
}

export function create(uuid: string):AccountAggregator {
    const account:AccountAggregator = {
        id: uuid,
        currentBalance: 0
    }

    return account
}

function applyCreateAccountCommand(account:AccountAggregator, command: ICreateAccountCommand) {
    account.currentBalance = command.balance
}

export function handleEvents(account:AccountAggregator, events:IEvent[]):AccountAggregator {
    
    const aggregator: AccountAggregator = events.reduce((account: AccountAggregator, event: IEvent) => {
        console.log({event});

        switch(event.name) {
            case ACCOUNT_OPEN_EVENT:
                applyCreateAccountCommand(account, <ICreateAccountCommand> event.command)
                break;
    
            // case ACCOUNT_TRANSFERT_EVENT:
            //     handleTransfertEvent(account, <AccountTransfertEvent> event)
            //     break;            
        }
    
        console.log({account});

        return account
    }, account);

    return aggregator
}
