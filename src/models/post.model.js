const mongoose = require("mongoose");
const Users = require("../models/user.model");
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

module.exports = mongoose.model("post", postSchema); // post
