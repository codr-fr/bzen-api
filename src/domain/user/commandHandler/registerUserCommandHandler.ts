import bcrypt from "bcrypt"
import db from "../../../database/mongoose"
import { Event } from "../../../model/event"
import { RegisterUserCommand } from "../command/registerUserCommand"
import { UserRegistredEvent } from "../event/userRegistredEvent"

export const registerUserCommandHandler = async (command: RegisterUserCommand) => {
    await db()
    
    const saltRounds = process.env.BCRYPT_SALT_ROUND || '11'
    const salt = bcrypt.genSaltSync(parseInt(saltRounds))
    const hash = bcrypt.hashSync(command.password, salt)

    const event = new UserRegistredEvent(command.username, hash)
    const eventDocument = new Event(event)

    await eventDocument.save().catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}