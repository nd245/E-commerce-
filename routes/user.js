

// require express
const express = require("express");
const { register, login } = require("../controlles/user");

const {
	registerValidation,
	validation,
	loginValidation,
  } 
  = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

// router
const router = express.Router();

// test route
//router.get("/test", (req, res) => {
	//res.send("hello world");
 //});//

// register
router.post("/register",register, registerValidation(), validation,); //registerValidation(), validation, register);//


// login
router.post("/login", login,registerValidation(), validation) ;

//current user
router.get("/current", isAuth, (req, res) => {
	res.send(req.user);
});

//export 
module.exports= router ;