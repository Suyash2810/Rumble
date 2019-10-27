const {
  User
} = require('../models/user');

const {
  populateUsers,
  users,
  user1Token,
  user2Token
} = require('./Test/user.mvc.seed');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('./../app');

const {
  ObjectID
} = require('mongodb');

beforeEach(populateUsers);

describe("User MVC Test", () => {

  context("user create tests", () => {

    it("should create the user.", (done) => {
      let data = {
        username: "Sheldon",
        email: "sheldon@gmail.com",
        password: "Sheldon123.."
      };

      supertest(app)
        .post('/user')
        .send(data)
        .expect(200)
        .expect(
          (response) => {
            expect(response.body.user.username).to.be.equal('Sheldon');
            expect(response.body.user.email).to.be.equal('sheldon@gmail.com');
            expect(response.body.user.imagePath).to.exist;
          }
        ).end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            done();
          }
        );
    });

    it("should not create the user when data incomplete", (done) => {

      let data = {
        email: 'michael@gmail.com',
        password: 'Michael123..'
      };

      supertest(app)
        .post('/user')
        .send(data)
        .expect(400)
        .end(
          (err, result) => {
            expect(err).to.be.null;
            expect(result.body.error.errors).to.exist;
            expect(result.body.error._message).to.be.equal('User validation failed');

            User.find({
              email: "michael@gmail.com"
            }).then(
              (result) => {
                expect(result.length).to.be.equal(0);
              }
            );

            done();
          }
        );
    });
  });

  context("user login tests", () => {

    it("should login the user", (done) => {

      let data = {
        email: users[0].email,
        password: users[0].password
      };

      supertest(app)
        .post('/auth/login')
        .send(data)
        .expect(200)
        .expect(
          (response) => {
            expect(response.body.success).to.exist;
            expect(response.body.success).to.be.equal("The user has been logged in successfully");
            expect(response.body.user).to.exist;
            expect(response.body.user.email).to.be.equal(users[0].email);
            expect(response.body.user.username).to.be.equal(users[0].username);
            expect(response.body.user.imagePath).to.be.equal(users[0].imagePath);
            expect(response.body.user._id).to.exist;
            expect(response.body.user._id).to.be.equal(users[0]._id);
            expect(response.body.token).to.exist;
            expect(response.body.creator_id).to.exist;
            expect(response.body.expiresIn).to.exist;
            expect(response.body.expiresIn).to.be.equal(3600);
          }
        ).end(
          (err, result) => {

            if (err) {
              return done(err);
            }

            User.findById(users[0]._id).then(
              (user) => {
                expect(user._id).to.exist;
                expect(user.username).to.exist;
                expect(user.email).to.exist;
                expect(user.imagePath).to.exist;
                done();
              }
            ).catch(
              (error) => {
                done(error);
              }
            );


          }
        );
    });

    it("should not login an invalid user.", (done) => {

      let data = {
        email: "bryann@gmail.com",
        password: "Bryann123.."
      }

      supertest(app)
        .post('/auth/login')
        .send(data)
        .expect(404)
        .end(
          (err, result) => {
            expect(result.body.status).to.exist;
            expect(result.body.status).to.be.equal('Email or password is invalid.');
            expect(result.body.error).to.exist;
            expect(result.body.error).to.be.equal('User was not found in the database.');
            done();
          }
        );
    });

    it("should not login for invalid email", (done) => {

      let data = {
        email: 'bryanngmail.com',
        password: "Bryann123.."
      };

      supertest(app)
        .post('/auth/login')
        .send(data)
        .expect(404)
        .end(
          (err, result) => {
            expect(result.body.status).to.exist;
            expect(result.body.status).to.be.equal('Email or password is invalid.');
            expect(result.body.error).to.exist;
            expect(result.body.error).to.be.equal('User was not found in the database.');
            done();
          }
        );
    });
  });

  context("user info request", () => {

    it("should get the user info", (done) => {

      supertest(app)
        .get('/getUser')
        .set('authaccess', user1Token)
        .expect(200)
        .expect(
          (response) => {
            let body = response.body;
            expect(body.status).to.exist;
            expect(body.status).to.be.equal('The user has been successfully');
            expect(body.user).to.exist;
            expect(body.user._id).to.exist;
            expect(body.user._id).to.be.equal(users[0]._id);
            expect(body.user.username).to.be.equal(users[0].username);
            expect(body.user.email).to.be.equal(users[0].email);
            expect(body.user.imagePath).to.be.equal(users[0].imagePath);
          }
        )
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.status).to.exist;
            done();
          }
        );
    });

    it("should not get the user info for unauthorized user", (done) => {

      supertest(app)
        .get('/getUser')
        .expect(401)
        .end(
          (err, result) => {

            if (err) {
              return done(err);
            }

            expect(err).to.be.null;
            expect(result.body.error).to.be.equal('User isn\'t authenticated.');
            done();
          }
        );
    });

    it("should not get the user info in case of an invalid token", (done) => {

      supertest(app)
        .get('/getUser')
        .set('authaccess', 'somerandomtokenwhichisnotvalid')
        .expect(500)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.error).to.exist;
            done();
          }
        );
    });
  });
});
