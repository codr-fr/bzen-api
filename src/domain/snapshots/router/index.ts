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

/**
 * @swagger
 * /snapshot:
 *   post:
 *     summary: Create a snapshot of all aggregators
 *     tags: [Snapshot]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', resetSnapshots)
