const {
  User
} = require('../models/user');

const {
  populateUsers,
  users
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

  it("should populate the test database", (done) => {
    done();
  });
});
