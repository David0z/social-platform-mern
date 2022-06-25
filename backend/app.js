const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const usersRoutes = require("./routes/user-routes");
const postsRoutes = require("./routes/posts-routes");
const hashtagRoutes = require("./routes/hashtag-routes");
const chatRoutes = require("./routes/chat-routes")

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/hashtags", hashtagRoutes);
app.use("/api/chats", chatRoutes)

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}@cluster0.pb70t.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    const server = app.listen(5000)
    const io = require('socket.io')(server, {
      cors: {
        origin: ['http://localhost:3000'] // client link
      }
    });

    io.on('connection', socket => {
      const id = socket.handshake.query.id

      socket.join(id)

      socket.on('send-message', (sendMessageData) => {
        // console.log(sendMessageData);
        socket.broadcast.to(sendMessageData.recepient).emit('receive-message', sendMessageData)
      })
    })
  }
    
    )
  .catch((err) => console.log(err));
