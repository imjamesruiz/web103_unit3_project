import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/LocationEvents.css'
import { fetchLocations } from '../services/LocationsAPI'
import { fetchEvents } from '../services/EventsAPI'

const LocationEvents = () => {
    const { id } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                // load all locations then pick the one matching the URL id
                const locationsData = await fetchLocations()
                const selected = locationsData ? locationsData.find(loc => String(loc.id) === id) : null
                setLocation(selected)

                if (!selected) {
                    setError('Location not found')
                    return
                }

                // load all events and filter by location_id
                const eventsData = await fetchEvents()
                const filtered = Array.isArray(eventsData)
                    ? eventsData.filter(ev => String(ev.location_id) === String(selected.id))
                    : []
                setEvents(filtered)
            } catch (err) {
                console.error('Failed to load location events', err)
                setError('Failed to load data')
            } finally {
                setLoading(false)
            }
        })()
    }, [id])

    if (loading) return <div className='location-events'><p className="loading-message">Loading...</p></div>
    if (error) return <div className='location-events'><p className="error-message">{error}</p></div>

    return (
        <div className='location-events'>
            <div className="location-header">
                {location?.image && <img className="location-image" src={location.image} alt={location?.name} />}
                <h1 className="location-name">{location?.name ?? 'Unknown location'}</h1>
                {location && (
                    <p className="location-address">
                        {location.address}, {location.city}, {location.state} {location.zip}
                    </p>
                )}
            </div>

            {events && events.length > 0 ? (
                <ul className="location-events-list">
                    {events.map(event => (
                        <li key={event.id} className="location-event-card">
                            <h3 className="event-title">{event.title}</h3>
                            <div className="event-details">
                                {event.description && <p>{event.description}</p>}
                                <p className="event-date-time">
                                    {event.date} at {event.time}
                                </p>
                                {event.image && <img src={event.image} alt={event.title} />}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-events">No events scheduled at this location yet.</p>
            )}
        </div>
    )
}

export default LocationEvents