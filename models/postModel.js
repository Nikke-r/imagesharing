'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.query('SELECT kkk_posts.post_id, kkk.users_username, wop_cat.age, wop_cat.weight, wop_user.name as ownername, wop_cat.filename FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id;');
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getPost = async(params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM kkk_posts WHERE post_id = ?;',
            params,
        );
        return rows;
    } catch(e) {
        console.log(e);
    }
};

const addPost = async(params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO kkk_posts (filename, description) VALUES (?, ?);',
            params,
        );
        return rows;
    }catch(e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

const updatePost = async(params) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE kkk_posts SET description = ? WHERE kkk_posts.post_id = ?;',
            params,
        );
        console.log(rows);
        console.log('database query succesful');
        return rows;
    }catch(e){
        console.log('error', e.message);
        return {error: 'error in database query'};

    }
};
const deletePost = async(params) => {
    console.log(params);
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM kkk_posts WHERE kkk_post.post_id = ?;',
            params,
        );
        console.log('database query successful');
        return rows;
    }catch(e){
        console.log('error', e.message);
        return {error: 'error in database query'};

    }
};

module.exports = {
    getAllPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
};