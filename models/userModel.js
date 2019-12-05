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
            'SELECT * FROM kkk_users WHERE username = ?;',
            params,
        );
        return rows;
    } catch(e) {
        console.log(e);
    }
};

const addUser = async(params) => {
    try {
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

const getUserLogin = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    getUserLogin,
};
