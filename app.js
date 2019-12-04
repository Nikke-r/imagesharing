'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

app.use('/thumbnails', express.static('thumbnails'));
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(express.static('uploads'));

const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');

app.use('/post', postRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
