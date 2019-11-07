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
  });
});
