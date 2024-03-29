let {
  user1Token,
  user2Token,
  favorites,
  populateFavorites
} = require('./Test/favorite.mvc.seed');

let {
  ObjectID
} = require('mongodb');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');

let {
  Favorite
} = require('../models/favorite');

beforeEach(populateFavorites);

describe("Favorite Testing", () => {

  context("get favorites", () => {

    it("should get the favorites for user 1", (done) => {

      supertest(app)
        .get('/favorites')
        .set('authaccess', user1Token)
        .expect(200)
        .expect(
          (response) => {
            let status = response.body.status;
            expect(status).to.be.equal('The data has been fetched successfully');
            let data = response.body.favorites[0];
            expect(data._id).to.be.equal(favorites[0]._id);
            expect(data.username).to.be.equal(favorites[0].username);
            expect(data.title).to.be.equal(favorites[0].title);
            expect(data.description).to.be.equal(favorites[0].description);
            expect(data.postId).to.be.equal(favorites[0].postId);
            expect(data.userId).to.be.equal(favorites[0].userId);
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

    it("should get the favorites for user 2", (done) => {

      supertest(app)
        .get('/favorites')
        .set('authaccess', user2Token)
        .expect(200)
        .expect(
          (response) => {
            let status = response.body.status;
            expect(status).to.be.equal('The data has been fetched successfully');
            let data = response.body.favorites[0];
            expect(data._id).to.be.equal(favorites[1]._id);
            expect(data.username).to.be.equal(favorites[1].username);
            expect(data.title).to.be.equal(favorites[1].title);
            expect(data.description).to.be.equal(favorites[1].description);
            expect(data.postId).to.be.equal(favorites[1].postId);
            expect(data.userId).to.be.equal(favorites[1].userId);
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

    it("should not get the data for unauthorized user", (done) => {

      supertest(app)
        .get('/favorites')
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

  context("post favorite requests", () => {

    it("should post the favorite for authorized user", (done) => {

      let data = {
        username: "Abraham",
        title: "Some title",
        description: "Some description",
        postId: favorites[0].postId,
        userId: favorites[0].userId
      }

      supertest(app)
        .post('/favorite')
        .set('authaccess', user1Token)
        .send(data)
        .expect(200)
        .expect(
          (response) => {
            let status = response.body.status;
            expect(status).to.be.equal('The data has been saved succesfully');
            let fav = response.body.favorite;
            expect(fav._id).to.exist;
            expect(fav.username).to.be.equal(data.username);
            expect(fav.title).to.be.equal(data.title);
            expect(fav.description).to.be.equal(data.description);
            expect(fav.postId).to.be.equal(data.postId);
            expect(fav.userId).to.be.equal(data.userId);
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

    it("should not save for unauthorized user", (done) => {

      let data = {
        username: "Abraham",
        title: "Some title",
        description: "Some description",
        postId: favorites[0].postId,
        userId: favorites[0].userId
      }

      supertest(app)
        .post('/favorite')
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

    it("should not save for invalid data", (done) => {

      supertest(app)
        .post('/favorite')
        .set('authaccess', user2Token)
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
  });

  context("delete requests", () => {

    it("should delete the favorite successfully", (done) => {

      supertest(app)
        .delete(`/favorite/${favorites[0].postId}`)
        .set('authaccess', user1Token)
        .expect(200)
        .expect(
          (response) => {
            let status = response.body.status;
            expect(status).to.be.equal('The data has been deleted.');
            let data = response.body.favorite;
            expect(data._id).to.be.equal(favorites[0]._id);
            expect(data.username).to.be.equal(favorites[0].username);
            expect(data.title).to.be.equal(favorites[0].title);
            expect(data.description).to.be.equal(favorites[0].description);
            expect(data.postId).to.be.equal(favorites[0].postId);
            expect(data.userId).to.be.equal(favorites[0].userId);
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

    it("should not delete for invalid post id", (done) => {

      let id = new ObjectID().toHexString();

      supertest(app)
        .delete(`/favorite/${id}`)
        .set('authaccess', user1Token)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.statusCode).to.be.equal(200);
            expect(result.body.favorite).to.be.null;
            done();
          }
        );
    });

    it("should not delete for unauthorized user", (done) => {

      supertest(app)
        .delete(`/favorite/${favorites[0].postId}`)
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

  context("get favorite by parameters", () => {

    it("should get the favorite post by postId and userId", (done) => {

      supertest(app)
        .get(`/getFavoriteById/${favorites[0].postId}/${favorites[0].userId}`)
        .set('authaccess', user1Token)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            expect(data).to.exist;
            expect(data.status).to.be.equal('The data was found successfully.');
            let favorite = data.favorite;
            expect(favorite).to.exist;
            expect(favorite._id).to.be.equal(favorites[0]._id);
            expect(favorite.username).to.be.equal(favorites[0].username);
            expect(favorite.title).to.be.equal(favorites[0].title);
            expect(favorite.description).to.be.equal(favorites[0].description);
            expect(favorite.userId).to.be.equal(favorites[0].userId);
            expect(favorite.postId).to.be.equal(favorites[0].postId);
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

    it("should not get the favorite for invalid post id", (done) => {

      let fakepostId = new ObjectID().toHexString();

      supertest(app)
        .get(`/getFavoriteById/${fakepostId}/${favorites[0].userId}`)
        .set('authaccess', user1Token)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.favorite).to.be.null;
            done();
          }
        );
    });

    it("should not get the favorite for invalid user id", (done) => {

      let fakeUserId = new ObjectID().toHexString();

      supertest(app)
        .get(`/getFavoriteById/${favorites[0].postId}/${fakeUserId}`)
        .set('authaccess', user1Token)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.favorite).to.be.null;
            done();
          }
        );
    });

    it("should not get the favorite for unauthorized user", (done) => {

      supertest(app)
        .get(`/getFavoriteById/${favorites[0].postId}/${favorites[0].userId}`)
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
});
