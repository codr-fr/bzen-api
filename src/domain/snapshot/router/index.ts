import express from 'express'
import { resetSnapshots } from '../controller'

const router = express.Router()

router.post('/', resetSnapshots)

export default router
