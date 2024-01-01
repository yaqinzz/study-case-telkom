import express from 'express'
import chat from './chat.js'

const app = express()

app.use('/', chat)
app.use('/api', chat)
export default app
