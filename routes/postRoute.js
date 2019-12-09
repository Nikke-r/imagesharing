'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const postController = require('../controllers/postController');
const passport = require('passport');

router.get('/', postController.post_list_get);

router.get('/:id', postController.post_get);

router.post('/', upload.single('post'), postController.post_create);

//Routers for liking/disliking a post
router.post('/likes/:id', postController.add_like);
router.get('/likes/:id', postController.get_likes);
router.delete('/likes/:id', postController.delete_like);

router.delete('/:id', postController.post_delete);

module.exports = router;
