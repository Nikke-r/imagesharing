'use strict';
const postModel = require('../models/postModel');
const resize = require('../utils/resize');
const passport = require('passport');

const post_list_get = (req, res) => {
    passport.authenticate('jwt', ({session: false}), async (error, user, info) => {
      if (error) {
          console.log(error);
      }
      if (info !== undefined) {
          console.log(info.message);
      } else {
          const posts = await postModel.getAllPosts();
          await res.json({user, posts});
      }
    })(req, res)
};

const post_create = async(req, res) => {
    //createthumbnail
    try {
        await resize.makeThumbnail(req.file.path, 'thumbnails/' + req.file.filename, {width: 160, height: 160},);

        const params = [req.body.username, req.body.description ,req.file.filename];
        console.log(params);
        const response = await postModel.addPost(params);
        console.log(response);
        const post = await postModel.getPost([response.insertId]);
        await res.json(post);
    } catch(e) {
        console.log('error', e.message);
        res.status(400).json({message: 'error'});
    }
};

const post_get = async (req, res) => {
    const params = [req.params.id];
    const post = await postModel.getPost(params);
    await res.json(post[0]);

};

const post_delete = async(req, res) => {
    const params = [req.params.id];
    console.log(params);
    const response = await postModel.deletePost(params);
    await res.json(response);
};



module.exports = {
    post_get,
    post_list_get,
    post_create,
    post_delete,
};
