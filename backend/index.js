import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import postsRoute from './routes/postsRoute.js'
import usersRoute from './routes/usersRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app= express()
const __filename= fileURLToPath(import.meta.url)
const __dirname= path.dirname(__filename)
const corsOptions= {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(express.json())
app.use(cors(corsOptions))
app.use('/posts', postsRoute)
app.use('/users', usersRoute)
app.use('/public', express.static(path.join(__dirname, 'public')));


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })
