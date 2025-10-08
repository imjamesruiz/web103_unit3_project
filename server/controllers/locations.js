import { pool } from '../config/database.js'

// Returns all locations rows as an array
export async function getAllLocations() {
  const sql = 'SELECT * FROM locations ORDER BY id;'
  const { rows } = await pool.query(sql)
  return rows
}

// Express handler wrapper: GET /locations
export async function getAllLocationsHandler(req, res) {
  try {
    const locations = await getAllLocations()
    res.json(locations)
  } catch (err) {
    console.error('Error fetching locations', err)
    res.status(500).json({ error: 'Failed to fetch locations' })
  }
}
