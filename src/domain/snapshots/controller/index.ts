import { Request, Response } from 'express'
import db from '../../../database/mongoose'
import { IAggregator } from '../../../interface/aggregator'
import { ISnapshot } from '../../../interface/snapshot'
import { Snapshot } from '../../../model/snapshot'
import { findAllAccounts } from '../../account/repository'
import { findAllUsers } from '../../user/repository'

export const resetSnapshots = async (req: Request, res: Response) => {
  await db()

  await Snapshot.deleteMany()
  await generateSnapshots(await findAllUsers())
  await generateSnapshots(await findAllAccounts())

  res.status(200).json({})
}

const generateSnapshots = async (users: IAggregator[]) => {
  const snapshots = users.map((user): ISnapshot => {
    return {
      uuid: user.id,
      name: user.constructor.name,
      snapshot: user.toObject()
    }
  })

  await Snapshot.insertMany(snapshots)
}
