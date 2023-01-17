const session = require('express-session');
const express = require('express');
const cookies = require('cookie-parser');
const path = require('path');
const cors = require('cors');

module.exports = {
  config(app) {
    app.use(
      session({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: true,
      })
    );
    app.use(cors());
    app.use(express.json());
    app.use(cookies(process.env.SECRET));
    // app.use(userLoggedMiddleware);
    app.use(express.urlencoded({ extended: true }));
    app.use('/public', express.static(path.resolve(__dirname, '../../public')));
    app.use('/upload', express.static(path.resolve(__dirname, '../../upload')));
  },
};
