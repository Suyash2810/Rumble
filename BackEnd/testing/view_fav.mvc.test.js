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
            expect(data[1].favorites).to.be.equal(1);
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

    it("should not update the post data for non existing post data", (done) => {

      let data = {
        post_id: new ObjectID().toHexString()
      }

      supertest(app)
        .patch('/updateViewData')
        .send(data)
        .expect(400)
        .expect(
          (response) => {
            expect(response.body.err).to.be.equal('Data could not be retrieved.');
          }
        )
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

    it("should not update the data when post id not sent", (done) => {

      supertest(app)
        .patch('/updateViewData')
        .expect(400)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(400);
            done();
          }
        );
    });

    it("should update increment the favorites", (done) => {

      let data = {
        post_id: viewFavs[0].parent_post_id,
        change: 1
      };

      supertest(app)
        .patch('/updateFavData')
        .send(data)
        .expect(200)
        .expect(
          (response) => {

            let status = response.body.status;
            expect(status).to.be.equal('The favorites were updated.');
            let data = response.body.data;
            expect(data.favorites).to.be.equal(1);
            expect(data._id).to.exist;
            expect(data.views).to.exist;
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

    it("should update increment the favorites", (done) => {

      let data = {
        post_id: viewFavs[1].parent_post_id,
        change: -1
      };

      supertest(app)
        .patch('/updateFavData')
        .send(data)
        .expect(200)
        .expect(
          (response) => {

            let status = response.body.status;
            expect(status).to.be.equal('The favorites were updated.');
            let data = response.body.data;
            expect(data.favorites).to.be.equal(0);
            expect(data._id).to.exist;
            expect(data.views).to.exist;
            expect(data.parent_post_id).to.be.equal(viewFavs[1].parent_post_id);
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

    it("should not update the data for non existing post id", (done) => {

      let data = {
        post_id: new ObjectID().toHexString(),
        change: 1
      }

      supertest(app)
        .patch('/updateFavData')
        .send(data)
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

    it("should not update the data for invalid increment", (done) => {

      let data = {
        post_id: viewFavs[0].parent_post_id,
        change: 2
      }

      supertest(app)
        .patch('/updateFavData')
        .send(data)
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

    it("should not update the data for invalid decrement", (done) => {

      let data = {
        post_id: viewFavs[0].parent_post_id,
        change: -2
      }

      supertest(app)
        .patch('/updateFavData')
        .send(data)
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

  context("DELETE requests", () => {

    it("should delete the data", (done) => {

      supertest(app)
        .delete(`/deleteViewFavData/${viewFavs[0].parent_post_id}`)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.status).to.be.equal('The data has been deleted.');
            expect(result.statusCode).to.be.equal(200);
            done();
          }
        )
    });

    it("should not delete the data", (done) => {

      let id = new ObjectID().toHexString();

      supertest(app)
        .delete(`/deleteViewFavData/${id}`)
        .expect(200)
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
});
