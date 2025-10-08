import 'dotenv/config'
import { pool } from './database.js'

async function reset() {
	try {
		console.log('Resetting database...')

		// Drop tables if they exist (order matters for foreign keys)
		await pool.query('DROP TABLE IF EXISTS events;')
		await pool.query('DROP TABLE IF EXISTS locations;')

		// Create locations table
		await pool.query(`
			CREATE TABLE locations (
				id SERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				address TEXT,
				city TEXT,
				state TEXT,
				zip TEXT,
				image TEXT
			);
		`)

		// Create events table (references location id)
		await pool.query(`
			CREATE TABLE events (
				id SERIAL PRIMARY KEY,
				title TEXT NOT NULL,
				date DATE,
				time TEXT,
				location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
				image TEXT,
				description TEXT
			);
		`)

		// Seed some locations
		await pool.query(`
			INSERT INTO locations (name, address, city, state, zip, image) VALUES
			('Echo Lounge', '123 Echo St', 'Austin', 'TX', '78701', ''),
			('House of Blues', '456 Soul Ave', 'Austin', 'TX', '78702', ''),
			('Pavilion', '789 Park Ln', 'Austin', 'TX', '78703', ''),
			('American Airlines Center', '1000 Arena Blvd', 'Austin', 'TX', '78704', '')
			RETURNING id;
		`)

		// Seed some events (associate with locations 1-4)
		await pool.query(`
			INSERT INTO events (title, date, time, location_id, image, description) VALUES
			('Synth Night', '2025-10-20', '20:00', 1, '', 'An evening of synthwave and chill.'),
			('Blues Revival', '2025-11-05', '19:30', 2, '', 'Live blues acts all night.'),
			('Summer Pavilion Fest', '2026-06-12', '16:00', 3, '', 'Outdoor music fest.'),
			('Stadium Showcase', '2025-12-01', '19:00', 4, '', 'Headliner at the arena.')
		`)

		console.log('Database reset complete.')
	} catch (err) {
		console.error('Failed to reset database', err)
	} finally {
		// close the pool so node can exit when run as a script
		await pool.end()
	}
}

// When executed directly (node config/reset.js) run the reset.
reset()

export default reset
