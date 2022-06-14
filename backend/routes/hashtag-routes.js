const { Router } = require('express')
const hashtagControllers = require('../contollers/hashtag-controller')
const { authMiddleware } = require('../middleware/auth')

const router = Router()

router.post('/popular', hashtagControllers.hashtag_getPopular)
router.get('/followed/:userId', hashtagControllers.hashtag_getFollowed)
router.post('/:tagName', hashtagControllers.hashtag_getSingle)
router.post('/follow/:id', authMiddleware, hashtagControllers.hashtag_followSingle)

module.exports = router