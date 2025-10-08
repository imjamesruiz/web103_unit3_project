import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">All Events</Link></li>
            </ul>
          </nav>
          <Locations />
        </>
      )
    },
    {
      path: '/events',
      element: (
        <>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">All Events</Link></li>
            </ul>
          </nav>
          <Events />
        </>
      )
    },
    {
      path: '/location/:id',
      element: (
        <>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">All Events</Link></li>
            </ul>
          </nav>
          <LocationEvents />
        </>
      )
    },
  ])

  return (
    <div className='app'>
      {element}

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App