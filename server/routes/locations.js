import express from 'express'
import { getAllLocationsHandler } from '../controllers/locations.js'

const router = express.Router()

// GET / - return all locations
router.get('/', getAllLocationsHandler)

export default router
