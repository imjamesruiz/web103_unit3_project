import express from 'express'
import { getAllEventsHandler } from '../controllers/events.js'

const router = express.Router()

// GET / - return all events
router.get('/', getAllEventsHandler)

export default router
