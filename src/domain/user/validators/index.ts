import { findUserByUsername } from "../repository"

export const validateUserNameIsAvailable = async (username: string) => {
    const user = findUserByUsername(username)

    if (user !== undefined) {
        throw new Error(`Username allready taken`)
    }
}
