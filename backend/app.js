const express = require('express')
const usersRoutes = require('./routes/user-routes')
const postsRoutes = require('./routes/posts-routes')

const app = express()

app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)

app.listen(5000)