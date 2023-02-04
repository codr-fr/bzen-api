import { Request, Response } from 'express'
import db from '../../../database/mongoose'
import { IAggregator } from '../../../framework/aggregator'
import { findAll } from '../../../framework/repository'
import { ISnapshot, Snapshot } from '../../../framework/snapshot'
import { AccountAggregator } from '../../account/aggregator/accountAggregator'
import { UserAggregator } from '../../user/aggregator/userAggregator'

export const resetSnapshots = async (req: Request, res: Response) => {
  await db()

  await Snapshot.deleteMany()
  await generateSnapshots(await findAll(UserAggregator))
  await generateSnapshots(await findAll(AccountAggregator))

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
