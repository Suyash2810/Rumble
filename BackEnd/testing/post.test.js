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
        expect(error.errors.title).to.exist;
        expect(error.errors.content).to.exist;
        expect(error.errors.imagePath).to.exist;
        done();
      }
    )
  });

  it("should create the instance with no errors", (done) => {
    let post = new Post({
      title: "foo",
      content: "foofoo",
      imagePath: "imgPath"
    });

    expect(post).to.have.property('title').to.equal("foo");
    expect(post).to.have.property('content').to.equal("foofoo");
    expect(post).to.have.property('imagePath').to.equal('imgPath');
    done();
  });
});
