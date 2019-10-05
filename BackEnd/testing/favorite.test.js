const chai = require('chai');
const expect = chai.expect;

const {
  Favorite
} = require('../models/favorite');

describe("Testing the Favorite Model", () => {

  it("should create the instance with errors", (done) => {

    let favorite = new Favorite();

    favorite.validate(
      (error) => {
        expect(error.errors.username).to.exist;
        expect(error.errors.title).to.exist;
        expect(error.errors.description).to.exist;
        expect(error.errors.postId).to.exist;
        expect(error.errors.userId).to.exist;
      }
    );
    done();
  });

  it("should create the instance without any errors", (done) => {

    let favorite = new Favorite({
      username: "foo",
      title: "fooo",
      description: "foofoo",
      postId: "fg",
      userId: "df"
    });

    expect(favorite).to.have.property('username').to.equal('foo');
    expect(favorite).to.have.property('title').to.equal('fooo');
    expect(favorite).to.have.property('description').to.equal('foofoo');
    expect(favorite).to.have.property('postId').to.equal('fg');
    expect(favorite).to.have.property('userId').to.equal('df');
    done();
  });
});
