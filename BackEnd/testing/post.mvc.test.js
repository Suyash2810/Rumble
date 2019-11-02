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

const {
  user1Token,
  user2Token
} = require('./Test/user.mvc.seed');

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

    it("should not get the post for object id for which there is no post", (done) => {

      let id = new ObjectID().toHexString();

      supertest(app)
        .get(`/post/${id}`)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            expect(data.success).to.be.equal('The post has been fetched from the database.');
            expect(data.post).to.be.null;
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
  });

  context("delete post by id", () => {

    it("it should delete the post by valid id", (done) => {

      supertest(app)
        .delete(`/posts/${posts[0]._id}`)
        .set('authaccess', user1Token)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            expect(data._id).to.be.equal(posts[0]._id);
            expect(data.username).to.be.equal(posts[0].username);
            expect(data.title).to.be.equal(posts[0].title);
            expect(data.description).to.be.equal(posts[0].description);
            expect(data.createdAt).to.be.equal(moment().format("MMM Do YY"));
            expect(data.content).to.be.equal(posts[0].content);
            expect(data.imagePath).to.be.equal(posts[0].imagePath);
            expect(data.creator_id).to.be.equal(posts[0].creator_id);
            expect(data.commentStatus).to.be.equal(posts[0].commentStatus);
          }
        )
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body).to.exist;
            Post.find({}).then(
              (result) => {
                expect(result.length).to.be.equal(1);
              }
            )
            done();
          }
        );
    });

    it("should not delete the post by other user", (done) => {

      supertest(app)
        .delete(`/posts/${posts[0]._id}`)
        .set('authaccess', user2Token)
        .expect(401)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.error).to.exist;
            expect(result.error.status).to.be.equal(401);

            Post.find({}).then(
              (result) => {
                expect(result.length).to.be.equal(posts.length);
              }
            );
            done();
          }
        );
    });

    it("should not delete the post for invalid object id", (done) => {

      let id = new ObjectID();

      supertest(app)
        .delete(`/posts/${id}`)
        .set('authaccess', user1Token)
        .expect(401)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body).to.exist;
            expect(result.body.err).to.be.equal('Post could not be deleted.');
            expect(result.error.status).to.be.equal(401);
            expect(result.statusCode).to.be.equal(401);

            Post.find({}).then(
              (result) => {
                expect(result.length).to.be.equal(posts.length);
              }
            );

            done();
          }
        );
    });

    it("should not delete the post by an unauthorized user", (done) => {

      supertest(app)
        .delete(`/posts/${posts[0]._id}`)
        .expect(401)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }


            expect(result.statusCode).to.be.equal(401);
            expect(result.error.status).to.be.equal(401);


            Post.find({})
              .then(
                (result) => {
                  expect(result.length).to.be.equal(posts.length);
                }
              );
            done();
          }
        );
    });
  });

  context("update the comment status", () => {

    it("should update the comment status", (done) => {

      let data = {
        commentStatus: false,
        postID: posts[0]._id,
        postCreatorID: posts[0].creator_id
      }

      supertest(app)
        .patch('/post/commentStatus')
        .set('authaccess', user1Token)
        .send(data)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;

            expect(data.status).to.be.equal('The data has been successfully saved.');
            expect(data.post._id).to.be.equal(posts[0]._id);
            expect(data.post.username).to.be.equal(posts[0].username);
            expect(data.post.title).to.be.equal(posts[0].title);
            expect(data.post.description).to.be.equal(posts[0].description);
            expect(data.post.createdAt).to.be.equal(moment().format("MMM Do YY"));
            expect(data.post.content).to.be.equal(posts[0].content);
            expect(data.post.imagePath).to.be.equal(posts[0].imagePath);
            expect(data.post.creator_id).to.be.equal(posts[0].creator_id);
            expect(data.post.commentStatus).to.not.be.equal(posts[0].commentStatus);
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
