'use strict';
const postModel = require('../models/postModel');
const resize = require('../utils/resize');
const passport = require('passport');
const imageMeta = require('../utils/imageMetadata');

const post_list_get = async (req, res) => {
    const posts = await postModel.getAllPosts();
    await res.json(posts);
};

const post_create = (req, res) => {
    passport.authenticate('jwt', ({session: false}), async (error, user, info) => {
        if (error) {
            console.log(error);
            res.send('Error adding post');
        }

        if (info!== undefined) {
            console.log(info.message);
        } else {
            //createthumbnail
            try {
                await resize.makeThumbnail(req.file.path, 'thumbnails/' + req.file.filename, {width: 600, height: 600},);

                //Get coordinates from image
                const coords = await imageMeta.getCoordinates(req.file.path);

                //Get current day as YYYY-MM-DD format
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const timestamp = `${year}-${month}-${day}`;

                const params = [user.user_id, timestamp, req.file.filename, req.body.description, coords];
                const response = await postModel.addPost(params);
                const post = await postModel.getPost([response.insertId]);
                await res.json(post);
            } catch(e) {
                console.log('error', e.message);
                res.status(400).json({message: 'error'});
            }
        }
    })(req, res);
};

const post_get = async (req, res) => {
    const params = [req.params.id];
    const post = await postModel.getPost(params);
    await res.json(post[0]);
};

const post_delete = (req, res) => {
    passport.authenticate('jwt', ({session: false}), async (error, user, info) => {
        if (error) {
            console.log(error);
            res.send('Error deleting post');
        }
        if (info !== undefined) {
            console.log(error.message);
        } else {
            const params = [req.params.id];
            const response = await postModel.deletePost(params);
            await res.json(response);
        }
    })(req, res);
};

const add_like = (req, res) => {
    passport.authenticate('jwt', ({session: false}), async (error, user, info) => {
        if (error) {
            console.log(error);
        }
        if (info !== undefined) {
            console.log(info.message);
        } else {
            const params = [user.user_id, req.params.id];
            const response = await postModel.addLike(params);
            await res.json(response);
        }
    })(req, res);
};

const get_likes = (req, res) => {
  passport.authenticate('jwt', ({session: false}), async (error, user, info) => {
      if (error) {
          console.log(error);
      }
      if (info !== undefined) {
          console.log(info.message);
      } else {
          const likes = await postModel.getLikes([req.params.id]);
          const users = await postModel.getLikeNames([req.params.id]);
          await res.json({likes, users});
      }
  })(req, res);
};

const delete_like = (req, res) => {
    passport.authenticate('jwt', ({session: false}), async (error, user, info) => {
        if (error) {
            console.log(error);
        }
        if (info !== undefined) {
            console.log(info.message);
        } else {
            const response = await postModel.deleteLike([user.user_id, req.params.id]);
            await res.json(response);
        }
    })(req, res);
};

module.exports = {
    post_get,
    post_list_get,
    post_create,
    post_delete,
    add_like,
    get_likes,
    delete_like
};
