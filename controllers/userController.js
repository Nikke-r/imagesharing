'use strict';
const userModel = require('../models/userModel');

//const users = userModel.users;

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    await res.json(users);
};

const user_get = async (req, res) => {
    const result = await userModel.getUser([req.params.id]);
    await res.json(result[0]);
};

const user_get_session = async (req, res) => {
    const [result] = await userModel.getUser([req.params.id]);
    await res.json(result);
};

module.exports = {
    user_list_get,
    user_get,
    user_get_session,
};
