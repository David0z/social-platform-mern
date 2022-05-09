const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const usersRoutes = require("./routes/user-routes");
const postsRoutes = require("./routes/posts-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}@cluster0.pb70t.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(app.listen(5000))
  .catch((err) => console.log(err));