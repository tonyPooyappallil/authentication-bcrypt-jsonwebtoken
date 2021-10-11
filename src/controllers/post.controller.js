const express = require("express");

const router = express.Router();

const Post = require("../models/post.model");
const Users = require("../models/user.model");

const authenticate = require("../middlewares/authenticate");

router.post("/", async function (req, res) {
  const posts = await Post.create(req.body);
  // const user = req.user;

  return res.send({ posts });
});

router.get("/", authenticate, async function (req, res) {
  const posts = await Post.find().lean().exec();
  const user = req.user;

  return res.send({ posts, user });
});

module.exports = router;
