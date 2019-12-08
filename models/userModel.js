'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM kkk_users');
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getUser = async(params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM kkk_users WHERE user_id = ?;',
            params,
        );
        return rows;
    } catch(e) {
        console.log('error', e.message);
    }
};

const getUserByName = async (param) => {
    try {
        const [user] = await promisePool.execute(
            'SELECT * FROM kkk_users WHERE username = ?;',
            param,
        );
        return user;
    } catch(e) {
        console.log('error', e.message);
    }
};

const getUserEmail = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM kkk_users WHERE email = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const addUser = async(params) => {
    try {
        console.log('whiip');
        const [rows] = await promisePool.execute(
            'INSERT INTO kkk_users (username, email, password) VALUES (?, ?, ?);',
            params,
        );
        return rows;
    }catch(e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

module.exports = {
    getAllUsers,
    getUser,
    getUserEmail,
    addUser,
    getUserByName
};