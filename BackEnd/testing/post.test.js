const chai = require('chai');
const expect = chai.expect;
const {
  Post
} = require('../models/post');

describe("Post Model Testing", () => {

  it("should create the instance with errors", (done) => {
    let post = new Post();

    post.validate(
      (error) => {
        expect(error.errors.username).to.exist;
        expect(error.errors.title).to.exist;
        expect(error.errors.description).to.exist;
        expect(error.errors.content).to.exist;
        expect(error.errors.imagePath).to.exist;
        expect(error.errors.creator_id).to.exist;
        done();
      }
    )
  });

  it("should create the instance with no errors", (done) => {
    let post = new Post({
      username: 'fooo',
      title: "foo",
      description: 'fooing',
      content: "foofoo",
      imagePath: "imgPath",
      creator_id: 'sdbfust38274t32gvsddfyt'
    });

    expect(post).to.have.property('username').to.equal('fooo');
    expect(post).to.have.property('title').to.equal("foo");
    expect(post).to.have.property('description').to.equal('fooing');
    expect(post).to.have.property('content').to.equal("foofoo");
    expect(post).to.have.property('imagePath').to.equal('imgPath');
    expect(post).to.have.property('creator_id').to.equal('sdbfust38274t32gvsddfyt');
    done();
  });
});
