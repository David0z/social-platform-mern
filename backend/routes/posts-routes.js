const { Router } = require('express')
const postsControllers = require('../contollers/posts-controller')

const router = Router()

router.get('/', postsControllers.posts_getAll)
router.post('/', postsControllers.posts_postNew)
router.get('/:id', postsControllers.posts_getSingle)
router.patch('/:id', postsControllers.posts_editSingle)
router.put('/:id', postsControllers.posts_commentSingle)

module.exports = router