import express from 'express'
import { resetSnapshots } from '../controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Snapshot
 *   description: The snapshot managing API
 */
export default express.Router().use('/snapshot', router)

router.post('/', resetSnapshots)
