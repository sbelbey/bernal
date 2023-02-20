const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const googleStrategy = require('../strategies/google');
const passportUtils = require('../utils/passportUtils');

module.exports = {
  config(app) {
    app.use(
      cors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      session({
        name: 'googleSession',
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookies: {
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        },
      })
    );
    app.use(compression());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(googleStrategy);
    app.use('/public', express.static(path.resolve(__dirname, '../../public')));
    app.use('/upload', express.static(path.resolve(__dirname, '../../upload')));
  },
};
