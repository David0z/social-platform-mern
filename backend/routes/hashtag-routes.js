const { Router } = require('express')
const hashtagControllers = require('../contollers/hashtag-controller')
const { authMiddleware } = require('../middleware/auth')

const router = Router()

router.get('/:tagName', hashtagControllers.hashtag_getSingle)
router.post('/follow/:id', authMiddleware, hashtagControllers.hashtag_followSingle)

module.exports = router