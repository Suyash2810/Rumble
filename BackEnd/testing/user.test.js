const chai = require('chai');
const expect = chai.expect;
const {
  User
} = require('../models/user');

describe("Testing User Model", () => {

  it("should create the instance of the User model with errors", (done) => {
    const user = new User();

    user.validate(
      (error) => {
        expect(error.errors.email).to.exist;
        expect(error.errors.password).to.exist;
        expect(error.errors.username).to.exist;
        done();
      }
    );
  });

  it("should create the instance without any errors.", (done) => {
    const user = new User({
      username: "foo",
      email: "foo@gmail.com",
      password: "foofoo"
    });

    expect(user).to.have.property('username').to.equal('foo');
    expect(user).to.have.property('email').to.equal('foo@gmail.com');
    expect(user).to.have.property('password').to.equal('foofoo');
    done();
  });
});
