import { pool } from '../config/database.js'

// Returns all events rows as an array
export async function getAllEvents() {
  const sql = 'SELECT * FROM events ORDER BY id;'
  const { rows } = await pool.query(sql)
  return rows
}

// Express handler wrapper: GET /events
export async function getAllEventsHandler(req, res) {
  try {
    const events = await getAllEvents()
    res.json(events)
  } catch (err) {
    console.error('Error fetching events', err)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}
