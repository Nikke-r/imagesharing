'use strict';
const postModel = require('../models/postModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');



const post_list_get = async (req, res) => {
    const posts = await postModel.getAllPosts();
    await res.json(posts);
};

const post_create = async(req, res) => {
    //createthumbnail
    try {
        await resize.makeThumbnail(req.file.path, 'thumbnails/' + req.file.filename, {width: 160, height: 160},);
//add coords
        const coords = await imageMeta.getCoordinates(req.file.path);
        console.log('coords', coords);

        const params = [req.body.name, req.body.age, req.body.weight, req.body.owner, req.file.filename, coords];
        console.log(params);
        const response = await catModel.addPost(params);
        console.log(response);
        const post = await catModel.getPost([response.insertId]);
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

const post_modify = async(req, res) => {

    const params = [req.body.name, req.body.age, req.body.weight, req.body.owner, req.body.id];
    console.log(params);
    const response = await postModel.updatePost(params);
    console.log(response);
    console.log(response.error);
    const post = await postModel.getPost([response.insertId]);
    await res.json(post);
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
    post_modify,
    post_delete,
};
