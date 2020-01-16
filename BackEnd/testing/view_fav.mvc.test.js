const {
  id1,
  id2,
  viewFavs,
  populateViewFavs
} = require('./Test/view_fav.mvc.seed');

const {
  ObjectID
} = require('mongodb');

const app = require('../app');
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

beforeEach(populateViewFavs);

describe("View Favorites MVC Testing", () => {

  context("POST requests", () => {

    it("should save the post", (done) => {

      let id = new ObjectID().toHexString();
      let data = {
        post_id: id
      }

      supertest(app)
        .post('/createViewFavData')
        .send(data)
        .expect(200)
        .expect(
          (response) => {

            let status = response.body.status;
            expect(status).to.be.equal('The data has been saved.');
            let data = response.body.data;
            expect(data.views).to.be.equal(0);
            expect(data.favorites).to.be.equal(0);
            expect(data._id).to.exist;
            expect(data.parent_post_id).to.exist;
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

    it("should not save the data for invalid data", (done) => {

      supertest(app)
        .post('/createViewFavData')
        .expect(400)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(400);
            done();
          }
        )
    });
  });

  context("GET requests", () => {

    it("should get the data", (done) => {

      supertest(app)
        .get('/getPostViewData')
        .expect(200)
        .expect(
          (response) => {

            let status = response.body.status;
            expect(status).to.be.equal('The data has been fetched.');
            let data = response.body.data;
            expect(data.length).to.be.equal(2);
            expect(data[0]._id).to.exist;
            expect(data[0].views).to.be.equal(0);
            expect(data[0].favorites).to.be.equal(0);
            expect(data[0].parent_post_id).to.be.equal(viewFavs[0].parent_post_id);
            expect(data[1]._id).to.exist;
            expect(data[1].views).to.be.equal(0);
            expect(data[1].favorites).to.be.equal(0);
            expect(data[1].parent_post_id).to.be.equal(viewFavs[1].parent_post_id);
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
        )
    });
  });

  context("UPDATE requests", () => {

    it("should update the post data", (done) => {

      let data = {
        post_id: viewFavs[0].parent_post_id
      }

      supertest(app)
        .patch('/updateViewData')
        .send(data)
        .expect(200)
        .expect(
          (response) => {
            let status = response.body.status;
            expect(status).to.be.equal('The views were updated.');
            let data = response.body.data;
            expect(data.views).to.be.greaterThan(0);
            expect(data.favorites).to.exist;
            expect(data._id).to.exist;
            expect(data.parent_post_id).to.be.equal(viewFavs[0].parent_post_id);
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