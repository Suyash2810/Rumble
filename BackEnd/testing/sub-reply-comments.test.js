const chai = require('chai');
const expect = chai.expect;
var {
  SubReply
} = require('../models/subComments');

describe("Sub Reply Comment Model", () => {

  it("should create the instance ofthe model with errors.", (done) => {
    let reply = new SubReply();

    reply.validate(
      (error) => {
        expect(error.errors.username).to.exist;
        expect(error.errors.imagePath).to.exist;
        expect(error.errors.content).to.exist;
        expect(error.errors.creator_id).to.exist;
        expect(error.errors.postId).to.exist;
        expect(error.errors.parent_Id).to.exist;
      }
    );

    done();
  });

  it("should create the instance without any errors", (done) => {
    let reply = new SubReply({
      username: "foo",
      imagePath: "/foo",
      createdAt: '20foo',
      content: 'foofoo',
      creator_id: '1234',
      postId: "ttrr",
      parent_Id: "rrtt"
    });

    expect(reply).to.have.property('username').to.equal('foo');
    expect(reply).to.have.property('imagePath').to.equal('/foo');
    expect(reply).to.have.property('createdAt').to.equal('20foo');
    expect(reply).to.have.property('content').to.equal('foofoo');
    expect(reply).to.have.property('creator_id').to.equal('1234');
    expect(reply).to.have.property('postId').to.equal('ttrr');
    expect(reply).to.have.property('parent_Id').to.equal('rrtt');
    done();
  });
});
