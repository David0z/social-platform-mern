const { Router } = require('express')
const chatControllers = require('../contollers/chat-controller')
const { authMiddleware } = require('../middleware/auth')

const router = Router()

router.get('/', authMiddleware, chatControllers.chat_getAllChats)
router.get('/:conversationId', authMiddleware, chatControllers.chat_getSingleConversation)
router.post('/send', authMiddleware, chatControllers.chat_sendMessage)

module.exports = router