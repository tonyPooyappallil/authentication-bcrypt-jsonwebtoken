const express = require("express");
require("dotenv").config();
const userController = require("./controllers/users.controller");
const postController = require("./controllers/post.controller");

const app = express();

app.use(express.json());

app.use("/users", userController);
app.use("/posts", postController);

module.exports = app;
