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
        done();
      }
    )
  });

  it("should create the instance with no errors", (done) => {
    let post = new Post({
      title: "foo",
      content: "foofoo"
    });

    expect(post).to.have.property('title').to.equal("foo");
    expect(post).to.have.property('content').to.equal("foofoo");
    done();
  });

  // it("should return errors for property not mentioned in the schema.", (done) => {
  //     let post = new Post({
  //         id:"3456",
  //         title:"foo",
  //         content: "foofoo"
  //     });
  // })
});
