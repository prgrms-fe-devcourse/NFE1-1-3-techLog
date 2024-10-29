const express = require('express');
const router = express.Router();
const path = require('path');
const postController = require(
  path.join(__dirname, '../controllers/postController'),
);
const deleteController = require('../controllers/deleteController');
const readAllController = require(
  path.join(__dirname, '../controllers/readAllController')
);
const readController = require(
  path.join(__dirname, '../controllers/readController')
);
const updateController = require('../controllers/updateController');


const verifyToken = require('../middleware/auth');

router.post('/create', verifyToken, postController.createPost);
router.delete('/delete/:id', verifyToken, deleteController.deletePost);
router.get('/all', readAllController.readAllPosts);
router.get('/read/:id', readController.readPost);
router.put('/update/:id', verifyToken, updateController.updatePost);

module.exports = router;
