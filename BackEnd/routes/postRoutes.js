const express = require('express');
const router = express.Router();
const path = require('path');
const postController = require(
  path.join(__dirname, '../controllers/posts/postController'),
);
const deleteController = require('../controllers/posts/deleteController');
const readAllController = require(
  path.join(__dirname, '../controllers/posts/readAllController'),
);
const readController = require(
  path.join(__dirname, '../controllers/posts/readController'),
);
const updateController = require('../controllers/posts/updateController');

const verifyToken = require('../middleware/auth');

router.post('/create', verifyToken, postController.createPost);
router.delete('/delete/:id', verifyToken, deleteController.deletePost);
router.get('/all', readAllController.readAllPosts);
router.get('/read/:id', readController.readPost);
router.put('/update/:id', verifyToken, updateController.updatePost);

module.exports = router;
