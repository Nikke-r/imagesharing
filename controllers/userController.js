'use strict';
const userModel = require('../models/userModel');

//const users = userModel.users;

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
};

const user_get = async (req, res) => {
    const params = [req.params.id];
    const user = await userModel.getUser(params);
    await res.json(user[0]);
};

const user_get_session = async (req, res) => {
    const [user] = await userModel.getUser([req.kkk_users.user_id]);
    await res.json(user);
};

const user_create = async (req, res) => {
    const params = [
    req.body.username, 
    req.body.email, 
    req.body.password,
    ];
    const response = await userModel.addUser(params);
    console.log(params);
    console.log(response);
    await res.json(response);
    //const user = await userModel.getUser([response.insertId]);
};

module.exports = {
    user_list_get,
    user_get,
    user_get_session,
    user_create,
};
