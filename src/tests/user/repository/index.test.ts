// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require("mockingoose") 

import { findAllUsers } from '../../../domain/user/repository'
import { Event } from '../../../model/event'

// TBD if usefull
describe.skip('User Repository', () => {
    
    mockingoose(Event).toReturn([
        {
          title: 'Book 1',
          author: {
            firstname: 'John',
            lastname: 'Doe'
          },
          year: 2021,
        },
        {
          title: 'Book 2',
          author: {
            firstname: 'Jane',
            lastname: 'Doe'
          },
          year: 2022,
        }
      ], 'find')
      

    test("Should return all users registred", () => {

        const users = findAllUsers()

        console.log(users)

        expect(1).toStrictEqual(2)
    })
})