let {
  ObjectID
} = require('mongodb');

let {
  notes,
  user1Token,
  user2Token,
  populateNotes
} = require('./Test/notes.mvc.seed');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');

beforeEach(populateNotes);

describe("Note MVC Tests", () => {

  context("get notes", () => {

    it("should get the notes", (done) => {

      supertest(app)
        .get('/note')
        .set('authaccess', user1Token)
        .expect(200)
        .expect(
          (response) => {
            expect(response.body).to.exist;
            let status = response.body.status;
            expect(status).to.be.equal('The data has been fetched.');
            let data = response.body.notes[0];
            expect(data._id).to.be.equal(notes[0]._id);
            expect(data.title).to.be.equal(notes[0].title);
            expect(data.description).to.be.equal(notes[0].description);
            expect(data.userId).to.be.equal(notes[0].userId);
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

    it("should not get the notes for unauthorized user", (done) => {

      supertest(app)
        .get('/note')
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

  context("Note post requests", () => {

    it("should save the note for authorized user with valid data sent", (done) => {

      let data = {
        title: "foo",
        description: "foofoo",
        color: "fofo",
        userId: notes[0].userId
      }

      supertest(app)
        .post('/note')
        .set('authaccess', user1Token)
        .send(data)
        .expect(200)
        .expect(
          (response) => {
            expect(response.body).to.exist;
            console.log(response.body);
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
