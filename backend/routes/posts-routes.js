const { Router } = require('express')
const postsControllers = require('../contollers/posts-controller')

const router = Router()

router.get('/', postsControllers.posts_get)

module.exports = router