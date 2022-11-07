const session = require('express-session');
const express = require('express');
const cookies = require('cookie-parser');
const path = require('path');

module.exports = {
  config(app) {
    app.use(
      session({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: true,
      })
    );
    app.use(express.json());
    app.use(cookies());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.use(express.static(path.resolve(__dirname, '../upload')));
  },
};
