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
            status = response.body.status;
            expect(status).to.be.equal('The data has been saved successfully.');
            expect(response.body.note._id).to.exist;
            expect(response.body.note.title).to.be.equal(data.title);
            expect(response.body.note.description).to.be.equal(data.description);
            expect(response.body.note.color).to.be.equal(data.color);
            expect(response.body.note.userId).to.be.equal(data.userId);
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

    it("should not save the note for authorized user with invalid data", (done) => {

      supertest(app)
        .post('/note')
        .set('authaccess', user1Token)
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

    it("should not save the note for unauthorized user", (done) => {

      let data = {
        title: "foo",
        description: "foofoo",
        color: "fofo",
        userId: notes[0].userId
      }

      supertest(app)
        .post('/note')
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

  context("delete note requests", () => {

    it("should delete the note", (done) => {

      supertest(app)
        .delete(`/note/${notes[0]._id}`)
        .set('authaccess', user1Token)
        .expect(200)
        .expect(
          (response) => {
            expect(response.body).to.exist;
            expect(response.body.status).to.be.equal('The note has been deleted.');
            let data = response.body.note;
            expect(data._id).to.be.equal(notes[0]._id);
            expect(data.title).to.be.equal(notes[0].title);
            expect(data.description).to.be.equal(notes[0].description);
            expect(data.userId).to.be.equal(notes[0].userId);
            expect(data.createdAt).to.exist;
            expect(data.color).to.be.equal(notes[0].color);
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

    it("should not delete for invalid id", (done) => {

      let id = new ObjectID().toHexString();

      supertest(app)
        .delete(`/note/${id}`)
        .set('authaccess', user1Token)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.body.note).to.be.null;
            expect(result.statusCode).to.be.equal(200);
            done();
          }
        );
    });

    it("should not delete for unauthorized user", (done) => {

      supertest(app)
        .delete(`/note/${notes[0]._id}`)
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
