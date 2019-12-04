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

  context("post sub reply requests", () => {

    it("should save the reply", (done) => {

      let data = {
        username: "Bryan",
        imagePath: '/images/userimages',
        creator_id: subreplies[0].creator_id,
        content: "this is some random content",
        postId: subreplies[0].postId,
        parent_Id: subreplies[0].parent_Id
      }


      supertest(app)
        .post('/reply')
        .set('authaccess', user1Token)
        .send(data)
        .expect(200)
        .expect(
          (response) => {
            expect(response.body.status).to.be.equal('The reply has been saved successfully.');
            let reply = response.body.reply;
            expect(reply.username).to.exist;
            expect(reply.imagePath).to.exist;
            expect(reply.createdAt).to.exist;
            expect(reply.creator_id).to.be.equal(data.creator_id);
            expect(reply.postId).to.be.equal(data.postId);
            expect(reply.parent_Id).to.be.equal(data.parent_Id);
            expect(reply.content).to.be.equal(data.content);
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

    it('should not save the reply for invalid data', (done) => {

      supertest(app)
        .post('/reply')
        .set('authaccess', user2Token)
        .expect(400)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.error._message).to.be.equal('SubReply validation failed');
            expect(result.statusCode).to.be.equal(400);
            done();
          }
        );
    });

    it("should not save the reply for unauthorize user", (done) => {

      let data = {
        username: "Bryan",
        imagePath: '/images/userimages',
        creator_id: subreplies[0].creator_id,
        content: "this is some random content",
        postId: subreplies[0].postId,
        parent_Id: subreplies[0].parent_Id
      }

      supertest(app)
        .post('/reply')
        .send(data)
        .expect(401)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(401);
            done();
          }
        );
    });
  });

  context("sub reply delete requests", () => {

    it("should delete the sub reply", (done) => {

      supertest(app)
        .delete(`/reply/${subreplies[0].postId}/${subreplies[0].parent_Id}`)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(200);
            expect(result.body.replies.deletedCount).to.be.greaterThan(0);
            done();
          }
        );
    });

    it("should not delete the sub replies for invalid ids", (done) => {

      let postId = new ObjectID().toHexString();
      let parent_Id = new ObjectID().toHexString();

      supertest(app)
        .delete(`/reply/${postId}/${parent_Id}`)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(200);
            expect(result.body.replies.deletedCount).to.be.equal(0);
            done();
          }
        );
    });


    it("should return and error for wrong ids", (done) => {

      let postId = new ObjectID().toHexString() + 'dgfusgdf';
      let parent_Id = new ObjectID().toHexString() + 'kfgsdfsf';

      supertest(app)
        .delete(`/reply/${postId}/${parent_Id}`)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(200);
            expect(result.body.replies.deletedCount).to.be.equal(0);
            done();
          }
        );
    });
  });
});
