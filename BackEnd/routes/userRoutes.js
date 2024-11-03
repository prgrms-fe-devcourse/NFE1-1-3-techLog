const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(
  path.join(__dirname, '../controllers/users/index.js'),
);

// user signup
router.post('/signup', userController.signupUser);

// user idCheckUser
router.post('/idCheck', userController.idCheckUser);

// user login
router.post('/login', userController.loginUser);

// user logout
router.post('/logout', userController.logoutUser);

module.exports = router;
