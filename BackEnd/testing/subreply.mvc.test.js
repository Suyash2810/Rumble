let {
  user1Token,
  user2Token,
  subreplies,
  populateSubReplies
} = require('./Test/subreply.mvc.seed');

let {
  ObjectID
} = require('mongodb');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('./../app');

beforeEach(populateSubReplies);

describe("Sub Reply MVC Test", () => {

  context("get specific sub replies", () => {

    it("should get the subreplies", (done) => {

      supertest(app)
        .get(`/reply/${subreplies[0].postId}/${subreplies[0].parent_Id}`)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;

            expect(data.status).to.be.equal('The replies have been fetched successfully.');
            let reply = data.replies[0];
            expect(reply).to.exist;
            expect(reply.username).to.be.equal(subreplies[0].username);
            expect(reply._id).to.be.equal(subreplies[0]._id);
            expect(reply.content).to.be.equal(subreplies[0].content);
            expect(reply.creator_id).to.be.equal(subreplies[0].creator_id);
            expect(reply.postId).to.be.equal(subreplies[0].postId);
            expect(reply.parent_Id).to.be.equal(subreplies[0].parent_Id);
            expect(reply.createdAt).to.exist;
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

    it("should not the sub replies for invalid id", (done) => {

      let postId = new ObjectID().toHexString();
      let parent_Id = new ObjectID().toHexString();

      supertest(app)
        .get(`/reply/${postId}/${parent_Id}`)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.replies.length).to.be.equal(0);
            done();
          }
        );
    });
  });
});
