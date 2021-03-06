const { Router } = require('express')
const userControllers = require('../contollers/user-controller')
const fileUpload = require('../middleware/file-upload')
const { authMiddleware } = require('../middleware/auth')

const router = Router()

router.post('/signup', fileUpload.single('image'), userControllers.users_signup)
router.post('/login', userControllers.users_login)
router.post('/:id', userControllers.users_getUser)
router.post('/follow/:id', authMiddleware, userControllers.user_followSingle)
router.get('/followed', authMiddleware, userControllers.user_getFollowedUsers)
// router.put('/:id', userControllers.users_editUser) // add later

module.exports = router