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

  context("get posts test", () => {
    it("get the posts as per page size and page index", (done) => {

      supertest(app)
        .get(`/posts?pagesize='4'&page='1'`)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            expect(data.status).to.exist;
            expect(data.status).to.be.equal('The data was sent successfully');
            expect(data.content).to.not.be.null;
            expect(data.maxPosts).to.be.equal(2);
          }
        )
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }
            expect(result.body).to.exist;

            done();
          }
        );
    });

    it("should get all the posts for invalid query params.", (done) => {

      supertest(app)
        .get(`/posts`)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            expect(data.status).to.exist;
            expect(data.status).to.be.equal('The data was sent successfully');
            expect(data.content).to.not.be.null;
            expect(data.content.length).to.be.equal(posts.length);
            expect(data.maxPosts).to.be.equal(posts.length);
          }
        )
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(200);
            done();
          }
        );
    });
  });
});
