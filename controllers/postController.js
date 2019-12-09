'use strict';
const postModel = require('../models/postModel');
const resize = require('../utils/resize');
const passport = require('passport');

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

        if (info!= undefined) {
            console.log(info.message);
        } else {
            //createthumbnail
            try {
                await resize.makeThumbnail(req.file.path, 'thumbnails/' + req.file.filename, {width: 160, height: 160},);

                //Fet current day as YYYY-MM-DD format
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const timestamp = `${year}-${month}-${day}`;

                const params = [user.user_id, timestamp, req.file.filename, req.body.description];
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
        if (info != undefined) {
            console.log(error.message);
        } else {
            const params = [req.params.id];
            const response = await postModel.deletePost(params);
            await res.json(response);
        }
    })(req, res);
};



module.exports = {
    post_get,
    post_list_get,
    post_create,
    post_delete,
};
