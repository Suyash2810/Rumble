const {
  Comment
} = require('../models/comments');

const {
  comments,
  populateComments,
  user1Token,
  user2Token
} = require('./Test/comment.mvc.seed');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('./../app');

const moment = require('moment');

beforeEach(populateComments);

describe("Comment Request Tests", () => {

  context("save comment request", () => {

    it("should save the comment", (done) => {

      let postData = {
        username: "Marianna",
        imagePath: '/sample.jpeg',
        content: "This is some random content.",
        creator_id: comments[0].creator_id,
        postId: comments[0].postId
      }

      supertest(app)
        .post('/comment')
        .send(postData)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            let comment = data.comment;

            expect(data.status).to.be.equal('Data has been stored successfully');
            expect(comment._id).to.exist;
            expect(comment.createdAt).to.be.equal(moment().format("MMM Do YY"));
            expect(comment.username).to.be.equal(postData.username);
            expect(comment.imagePath).to.be.equal(postData.imagePath);
            expect(comment.content).to.be.equal(postData.content);
            expect(comment.creator_id).to.be.equal(postData.creator_id);
            expect(comment.postId).to.be.equal(postData.postId);
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

    it("should not save the data", (done) => {

      supertest(app)
        .post('/comment')
        .expect(400)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.error.errors).to.exist;
            expect(result.body.error._message).to.be.equal('Comment validation failed');
            expect(result.body.error.message).to.exist;
            expect(result.body.error.name).to.be.equal('ValidationError');
            done();
          }
        );
    });
  });

  context("get comments request", () => {

    it("should get the comments by id", (done) => {

      supertest(app)
        .get(`/comment/${comments[0].postId}`)
        .expect(200)
        .expect(
          (response) => {
            expect(response.body.status).to.be.equal('The data has been retrieved successfully.');
            expect(response.body.comments).to.exist;
          }
        )
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(200);
            expect(result.body).to.exist;
            done();
          }
        );
    });
  });
});
