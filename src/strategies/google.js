const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();

const { createUser, findUser, updateUser } = require('../services/userServices');
const { userCleaner } = require('../helpers/dataCleaner');
const { generateRandomPassword } = require('../helpers/generateRandomPassword');
const { createToken } = require('../helpers/generateToken');

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/v1/users/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const { _json } = profile;
    const { email } = _json;
    const user = await findUser(email, undefined);
    let userLogged;

    if (user) {
      const userData = {
        id: user.id,
        name: user.name ?? _json.given_name,
        lastName: user.lastName ?? _json.family_name,
        avatar: user.avatar ?? _json.picture,
      };
      userLogged = await updateUser(userData);
      userLogged = await userCleaner(userLogged);
    } else {
      const userToCreate = {
        name: _json.given_name,
        lastName: _json.family_name,
        email: email,
        hashPassword: bcrypt.hashSync(generateRandomPassword(), 10),
        avatar: _json.picture,
        isAdmin: false,
        isActive: true,
      };
      userLogged = await createUser(userToCreate);
    }

    const userID = userLogged.id;

    const token = createToken(userID, userLogged.email);
    profile['token'] = token;
    profile['data'] = { name: _json.given_name, lastName: _json.family_name, avatar: userLogged.avatar, email: email };
    delete profile.displayName;
    delete profile.name;
    delete profile.id;
    delete profile.photos;
    delete profile._json;
    delete profile.provider;
    delete profile._raw;
    delete profile.emails;

    console.log(profile);

    return done(null, profile);
  }
);

module.exports = strategy;
