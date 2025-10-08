import 'dotenv/config'
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'

// import routers
import eventsRouter from './routes/events.js'
import locationsRouter from './routes/locations.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
// JSON body parsing
// Note: don't mount a non-existent `router` here. Individual API routers are mounted below.

// mount API routers
app.use('/api/events', eventsRouter)
app.use('/api/locations', locationsRouter)

if (process.env.NODE_ENV === 'development') {
    // development client public path is one level up in the workspace
    app.use(favicon(path.resolve('..', 'client', 'public', 'party.png')))
    app.use(express.static(path.resolve('..', 'client', 'public')))
    app.use('/assets', express.static(path.resolve('..', 'client', 'src', 'assets')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})