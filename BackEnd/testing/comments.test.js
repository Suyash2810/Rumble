var {
  Comment
} = require('../models/comments');

const chai = require('chai');
const expect = chai.expect;

describe("Comment Model", () => {

  it("should not create an instance and return errors", (done) => {
    let comment = new Comment();

    comment.validate(
      (error) => {
        expect(error.errors.username).to.exist;
        expect(error.errors.imagePath).to.exist;
        expect(error.errors.createdAt).to.exist;
        expect(error.errors.content).to.exist;
        expect(error.errors.creator_id).to.exist;
      }
    );
    done();
  });

  it("should create the comment instance", (done) => {

    let comment = new Comment({
      username: "foo",
      imagePath: "/foo",
      createdAt: '20foo',
      content: 'foofoo',
      creator_id: '1234'
    });

    expect(comment).to.have.property('username').to.equal('foo');
    expect(comment).to.have.property('imagePath').to.equal('/foo');
    expect(comment).to.have.property('createdAt').to.equal('20foo');
    expect(comment).to.have.property('content').to.equal('foofoo');
    expect(comment).to.have.property('created_id').to.equal('1234');

    done();
  });
});
