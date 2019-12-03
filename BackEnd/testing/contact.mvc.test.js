let {
  user1Token,
  user2Token,
  contacts,
  populateContacts
} = require('./Test/contact.mvc.seed');

const {
  users
} = require('./Test/user.mvc.seed');

const {
  ObjectID
} = require('mongodb');

const app = require('./../app');
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

beforeEach(populateContacts);

describe("Contact MVC Test", () => {

  context("get contacts", () => {

    it("should get the contacts", (done) => {

      supertest(app)
        .get('/contacts')
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            expect(data.status).to.be.equal('The messages have been successfully.');
            expect(data.contacts).to.exist;
            expect(data.contacts.length).to.be.equal(2);
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

  context('save contact', () => {

    it("should save the contact", (done) => {

      let data = {
        username: "Bryan",
        email: "bryan@gmail.com",
        phone: "9869504568",
        content: "Some random content",
        subject: "This is the subject",
        tag: 'technical',
        creator_id: users[0]._id
      }

      supertest(app)
        .post('/contact')
        .send(data)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            let contact = result.body.contact;
            expect(contact).to.exist;
            expect(contact._id).to.exist;
            expect(contact.username).to.be.equal("Bryan");
            expect(contact.email).to.be.equal("bryan@gmail.com");
            expect(contact.phone).to.be.equal("9869504568");
            expect(contact.content).to.be.equal("Some random content");
            expect(contact.subject).to.be.equal("This is the subject");
            expect(contact.tag).to.be.equal('technical');
            expect(contact.creator_id).to.be.equal(users[0]._id);
            expect(contact.createdAt).to.exist;

            done();
          }
        );
    });

    it('should not save the contact for missing data', (done) => {

      let data = {
        phone: "9869504568",
        content: "Some random content",
        subject: "This is the subject",
        tag: 'technical',
        creator_id: users[0]._id
      }

      supertest(app)
        .post('/contact')
        .send(data)
        .expect(400)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            expect(result.error.text).to.exist;
            done();
          }
        );
    });
  });

  context("delete a contact", () => {

    it("should delete the contact for a valid id and an authorized user", (done) => {

      supertest(app)
        .delete(`/contact/${contacts[0]._id}`)
        .set('authaccess', user1Token)
        .expect(200)
        .end(
          (err, result) => {
            if (err) {
              return done(err);
            }

            console.log(result);
            done();
          }
        );
    });
  });

  context('get contact by id', () => {

    it("should get the contact by id", (done) => {

      supertest(app)
        .get(`/contact/${contacts[0]._id}`)
        .expect(200)
        .expect(
          (response) => {
            let data = response.body;
            expect(data.status).to.be.equal('The contact has been fetched sucessfully.');
            let contact = data.contact;
            expect(contact._id).to.be.equal(contacts[0]._id);
            expect(contact.username).to.be.equal(contacts[0].username);
            expect(contact.email).to.be.equal(contacts[0].email);
            expect(contact.phone).to.be.equal(contacts[0].phone);
            expect(contact.content).to.be.equal(contacts[0].content);
            expect(contact.subject).to.be.equal(contacts[0].subject);
            expect(contact.tag).to.be.equal(contacts[0].tag);
            expect(contact.creator_id).to.be.equal(users[0]._id);
            expect(contact.createdAt).to.exist;
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
  })
});
