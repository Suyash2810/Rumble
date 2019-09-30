const chai = require('chai');
const expect = chai.expect;
const {
  Contact
} = require('../models/contact');

describe("Contact Model", () => {

  it("should cerate the instance with errors", (done) => {

    var contact = new Contact();

    contact.validate(
      (error) => {
        expect(error.errors.username).to.exist;
        expect(error.errors.email).to.exist;
        expect(error.errors.phone).to.exist;
        expect(error.errors.content).to.exist;
        expect(error.errors.tag).to.exist;
        expect(error.errors.subject).to.exist;
        done();
      }
    );
  });

  it("should create the instance without any errors", (done) => {

    var contact = new Contact({
      username: "foo",
      email: "foo@foo.com",
      phone: "foofoo",
      content: "fooo",
      creator_id: "idid",
      tag: "tag",
      subject: "fufu",
      createdAt: "fufufu"
    });

    expect(contact).to.have.property('username').to.equal('foo');
    expect(contact).to.have.property('email').to.equal('foo@foo.com');
    expect(contact).to.have.property('phone').to.equal('foofoo');
    expect(contact).to.have.property('content').to.equal('fooo');
    expect(contact).to.have.property('creator_id').to.equal('idid');
    expect(contact).to.have.property('tag').to.equal('tag');
    expect(contact).to.have.property('subject').to.equal('fufu');
    expect(contact).to.have.property('createdAt').to.equal('fufufu');
    done();
  });
});
