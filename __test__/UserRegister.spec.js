const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/database/models');
const db = require('../src/database/models/index.js');

beforeAll(() => {
  return global.db.sync();
});
// beforeEach(() => {
//   return db.destoy({ truncate: true });
// });

// describe('User Registration', () => {
//   it('return 200 OK when signup request is valid', (done) => {
//     request(app)
//       .post('/api/v1/users/register')
//       .send({
//         email: 'user@example.com',
//         password: 'P4ssword',
//         isAdmin: true,
//         isActive: true,
//       })
//       .then((response) => {
//         expect(response.status).toBe(200);
//         done();
//       });
//   });

//   it('return succes message when singup is valid', (done) => {
//     request(app)
//       .post('/api/v1/users/register')
//       .send({
//         email: 'user@example.com',
//         password: 'P4ssword',
//         isAdmin: true,
//         isActive: true,
//       })
//       .then((response) => {
//         expect(response.body.message).toBe('User created');
//         done();
//       });
//   });

//   it('Save the user to database', (done) => {
//     request(app)
//       .post('/api/v1/users/register')
//       .send({
//         email: 'user@example.com',
//         password: 'P4ssword',
//         isAdmin: true,
//         isActive: true,
//       })
//       .then(() => {
//         // query user table
//         User.findAll().then((userList) => {
//           expect(userList.length).toBe(1);
//           done();
//         });
//       });
//   });
// });

it('should have created a database with User table and 3 dummy user records', (done) => {
  const users = global.db.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      throw error;
    }
    expect(results).toHaveLength(3);
    done();
  });
});
