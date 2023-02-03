import { findUserByUsername } from "../repository"

export const validateUserNameIsAvailable = async (username: string) => {
    const user = await findUserByUsername(username)

    console.log(user)

    if (user !== undefined) {
        throw new Error(`Username allready taken`)
    }
}
