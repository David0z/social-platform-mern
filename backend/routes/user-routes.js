const { Router } = require('express')
const userControllers = require('../contollers/user-controller')

const router = Router()

router.get('/', userControllers.users_get)

module.exports = router