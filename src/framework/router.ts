import express from 'express'
import accountRouter from '../domain/account/router'
import userRouter from '../domain/user/router'
import snapshotRouter from '../domain/snapshot/router'

const router = express.Router()

router.use('/account', accountRouter)
router.use('/user', userRouter)
router.use('/snapshot', snapshotRouter)

export default router
