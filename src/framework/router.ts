import express from 'express'
import accountRouter from '../domain/account/router'
import userRouter from '../domain/user/router'
import snapshotRouter from '../domain/snapshots/router'

const router = express.Router()

/**
 * @openapi
 * components:
 *  responses:
 *    Success:
 *      description: Command correctly executed
 *    Error:
 *      description: An error occured
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: Error detail
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: Error detail
 */

router.use('/', accountRouter)
router.use('/', userRouter)
router.use('/', snapshotRouter)

export default router
