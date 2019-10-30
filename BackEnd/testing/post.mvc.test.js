const {
  Post
} = require('../models/post');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('../app');

const {
  ObjectID
} = require('mongodb');

const {
  populatePosts,
  posts
} = require('./Test/post.mvc.seed');

beforeEach(populatePosts);

describe("Post MVC Test", () => {

  it("first test", (done) => {
    done();
  })
});
