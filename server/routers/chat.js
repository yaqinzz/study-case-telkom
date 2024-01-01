import express from 'express'
import {home, chat, history} from '../controllers/chat.js'
const router = express.Router()

router.get('/', home)
router.post('/save-message', chat)
router.get('/history', history)

export default router
