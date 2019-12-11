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

    it("should get the favorites", (done) => {

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
  });
});
