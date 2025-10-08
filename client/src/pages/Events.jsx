import React, { useState, useEffect } from 'react'
import { fetchEvents } from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await fetchEvents()
        setEvents(data)
      } catch (err) {
        setError('Failed to load events. Please try again later.')
        console.error('Failed to load events', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div className="events-page"><h2>Loading events...</h2></div>
  if (error) return <div className="events-page"><h2>{error}</h2></div>

  return (
    <div className='events-page'>
      <h1 className="events-header">Upcoming Events</h1>
      {events && events.length > 0 ? (
        <ul className="events-list">
          {events.map(event => (
            <li key={event.id} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <div className="event-details">
                <p>{event.description}</p>
                <p className="event-date-time">
                  {event.date} at {event.time}
                </p>
                <p className="event-location">
                  {event.location_name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events scheduled at this time.</p>
      )}
    </div>
  )
}

export default Events