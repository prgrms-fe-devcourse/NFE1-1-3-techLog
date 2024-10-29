const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/deleteController');
const verifyToken = require('../middleware/auth');

router.delete('/delete/:id', verifyToken, deleteController.deletePost);

module.exports = router;