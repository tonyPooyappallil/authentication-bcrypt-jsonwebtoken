const express = require("express");

const { register, login } = require("./auth");

const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

const Users = require("../models/user.model");

router.post(
  "/register",
  body("name").isLength({ min: 1 }).withMessage("Name is Mandatory"),
  body("email").isLength({ min: 1 }).withMessage("Email id is required"),
  body("email").isEmail().withMessage("Please input a valid email id"),
  body("password").custom((value) => {
    //console.log(String(value).length);
    if (String(value).length < 6) {
      //console.log("value");
      throw new Error("password should contain minimum 8 characters");
    } else return true;
  }),
  async function (req, res) {
    const errors = validationResult(req);
    //console.log(errors);
    let finalErrors = null;
    if (!errors.isEmpty()) {
      finalErrors = errors.array().map((error) => {
        return {
          param: error.param,
          msg: error.msg,
        };
      });
      return res.status(400).json({ errors: finalErrors });
    }
    register(req, res);
  }
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please input a valid email id"),
  body("password").custom((value) => {
    //console.log(String(value).length);
    if (String(value).length < 6) {
      //console.log("value");
      throw new Error("password should contain minimum 8 characters");
    } else return true;
  }),
  async function (req, res) {
    const errors = validationResult(req);
    //console.log(errors);
    let finalErrors = null;
    if (!errors.isEmpty()) {
      finalErrors = errors.array().map((error) => {
        return {
          param: error.param,
          msg: error.msg,
        };
      });
      return res.status(400).json({ errors: finalErrors });
    }
    login(req, res);
  }
);

module.exports = router;
