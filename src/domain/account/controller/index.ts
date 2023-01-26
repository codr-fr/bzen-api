import { Request, Response } from "express";
import {v4} from "uuid";

// import amqplib from 'amqplib';
import { createAccountCommandValidate, ICreateAccountCommand } from "../command/createAccountCommand";
import { createAccountCommandHandler } from "../commandHandler/createAccountCommandHandler"

export const getAccount = async (req: Request, res: Response) => {
    
    interface AccountAggregator {
        id: string;
        currentBalance: number;
    }




    console.log(req.params)

    res.status(200).json({
        message: "Great success!"
    })
}

export const createAccount = async (req: Request, res: Response) => {

    const command: ICreateAccountCommand = {...req.body}
    command.uuid = v4()

    try {
        createAccountCommandValidate(command)
        await createAccountCommandHandler(command);

        res.status(200).json({
            message: "Great success!"
        })

    } catch (error: any) {
        console.error(error);

        res.status(500).json({
          error: error?.message,
        });
    }
}