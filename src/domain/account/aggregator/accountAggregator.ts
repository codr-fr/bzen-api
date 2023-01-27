import { IEvent } from "../../../interface/event";
import { ACCOUNT_CREATED_EVENT, IAccountCreatedEvent } from "../event/accountCreatedEvent";
import { ACCOUNT_CREDITED_EVENT, IAccountCreditedEvent } from "../event/accountCreditedEvent";
import { ACCOUNT_DEBITED_EVENT, IAccountDebitedEvent } from "../event/accountDebitedEvent";

export interface AccountAggregator {
    id: string;
    currentBalance: number;
    estimatedBalance: number;
}

export function create(uuid: string):AccountAggregator {
    const account:AccountAggregator = {
        id: uuid,
        currentBalance: 0,
        estimatedBalance: 0,
    }

    return account
}

function applyCreateAccountEvent(account:AccountAggregator, event: IAccountCreatedEvent) {
    account.currentBalance = event.payload.initialBalance
}

function applyCreditAccountEvent(account:AccountAggregator, event: IAccountCreditedEvent) {
    account.currentBalance += event.payload.amount
}

function applyDebitAccountEvent(account:AccountAggregator, event: IAccountDebitedEvent) {
    account.currentBalance -= event.payload.amount
}

export function handleEvents(account:AccountAggregator, events:IEvent[]):AccountAggregator {
    
    const aggregator: AccountAggregator = events.reduce((account: AccountAggregator, event: IEvent) => {
        console.log({event});

        switch(event.name) {
            case ACCOUNT_CREATED_EVENT:
                applyCreateAccountEvent(account, <IAccountCreatedEvent> event)
                break;

            case ACCOUNT_CREDITED_EVENT:
                applyCreditAccountEvent(account, <IAccountCreditedEvent> event)
                break;

            case ACCOUNT_DEBITED_EVENT:
                applyDebitAccountEvent(account, <IAccountDebitedEvent> event)
                break;                           
        }
    
        console.log({account});

        return account
    }, account);

    return aggregator
}
