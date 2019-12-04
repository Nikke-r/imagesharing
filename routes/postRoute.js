'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const postController = require('../controllers/postController');

router.get('/', postController.post_list_get);

router.get('/:id', postController.post_get);

router.post('/', upload.single('post'), postController.post_create);

router.delete('/:id', postController.post_delete);

module.exports = router;
