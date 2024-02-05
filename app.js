import express from "express";
import authRouter from "./api/auth.js";
import postsRouter from "./api/posts.js";
import usersRouter from "./api/users.js";
import profileRouter from "./api/profile.js";

import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// routes
// app.get('/', (req, res) => res.send('Hello Social3 Server!'));
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/profile", profileRouter);

// heroku special env
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  // npm run build for react app
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// Connect to DataBase

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB", err);
  });

// start the server - listen on port 3000
app.listen(process.env.PORT || 5000);
