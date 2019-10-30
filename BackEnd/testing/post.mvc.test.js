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

const moment = require('moment');

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

  context("get post by id test", () => {

    it("should get the post by id", (done) => {

      supertest(app)
        .get(`/post/${posts[0]._id}`)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;

            expect(data.success).to.be.equal('The post has been fetched from the database.');
            expect(data.post).to.exist;
            expect(data.post._id).to.be.deep.equal(posts[0]._id);
            expect(data.post.createdAt).to.be.equal(moment().format("MMM Do YY"));
            expect(data.post.username).to.be.equal(posts[0].username);
            expect(data.post.title).to.be.equal(posts[0].title);
            expect(data.post.description).to.be.equal(posts[0].description);
            expect(data.post.content).to.be.equal(posts[0].content);
            expect(data.post.imagePath).to.be.equal(posts[0].imagePath);
            expect(data.post.creator_id).to.be.equal(posts[0].creator_id);
            expect(data.post.commentStatus).to.be.equal(posts[0].commentStatus);
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