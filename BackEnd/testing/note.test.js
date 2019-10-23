const chai = require('chai');
const expect = chai.expect;
var {
  Note
} = require('../models/notes');

describe("Note Model Testing", () => {

  it("Should not create the instance for the Note model", (done) => {

    var note = new Note();

    note.validate(
      (error) => {
        expect(error.errors.title).to.exist;
        expect(error.errors.description).to.exist;
        expect(error.errors.userId).to.exist;
        expect(error.errors.color).to.exist;
        done();
      }
    );
  });

  it("should create the note instance", (done) => {

    let note = new Note({
      title: 'foo',
      description: 'foofoo',
      userId: '465',
      color: 'blue',
      createdAt: 'fooo'
    });

    expect(note).to.have.property('title').to.equal('foo');
    expect(note).to.have.property('description').to.equal('foofoo');
    expect(note).to.have.property('userId').to.equal('465');
    expect(note).to.have.property('color').to.equal('blue');
    expect(note).to.have.property('createdAt').to.equal('fooo');
    done();
  });
});
