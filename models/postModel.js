'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.query('SELECT kkk_posts.*, kkk_users.username AS username FROM kkk_posts LEFT JOIN kkk_users ON kkk_posts.user_id = kkk_users.user_id');
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
            'INSERT INTO kkk_posts (user_id, date, filename, description, coordinates) VALUES (?, ?, ?, ?, ?);',
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
        return rows;
    }catch(e){
        console.log('error', e.message);
        return {error: 'error in database query'};

    }
};
const deletePost = async(params) => {
    try {
        const [likes] = await promisePool.execute('DELETE FROM kkk_likes WHERE post_id = ?', params);
        const [post] = await promisePool.execute('DELETE FROM kkk_posts WHERE post_id = ?', params);
        return {likes, post};
    }catch(e){
        console.log('error', e.message);
        return {error: 'error in database query'};

    }
};

const addLike = async (params) => {
  try {
      const [rows] = await promisePool.execute('INSERT INTO kkk_likes (user_id, post_id) VALUES (?, ?)', params);
      return rows;
  } catch (e) {
      console.log('add like error ' + e);
      return {errormessage: 'Error adding a like'};
  }
};

const getLikes = async (param) => {
    try {
        const [rows] = await promisePool.execute('SELECT COUNT(post_id) AS likes FROM kkk_likes WHERE post_id = ?', param);
        return rows;
    } catch (e) {
        console.log('getLikes error ' + e);
        return {errormessage: 'Error getting likes'};
    }
};

const getLikeNames = async (param) => {
    try {
        const [rows] = await promisePool.execute('SELECT user_id FROM kkk_likes WHERE post_id = ?', param);
        return rows;
    } catch (e) {
        console.log('getLikeNames error + ' + e);
        return {errormessage: 'Cannot get like names'};
    }
};

const deleteLike = async (params) => {
    try {
        const [rows] = await promisePool.execute('DELETE FROM kkk_likes WHERE user_id = ? AND post_id = ?', params);
        return rows;
    } catch (e) {
        console.log(e);
        return {errormessage: 'Error disliking the post'}
    }
};

module.exports = {
    getAllPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
    addLike,
    getLikes,
    getLikeNames,
    deleteLike
};