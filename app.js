'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const passport = require('./utils/passport');
const bodyParser = require('body-parser');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/thumbnails', express.static('thumbnails'));
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(express.static('uploads'));

const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
