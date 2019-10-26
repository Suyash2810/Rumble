const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
chai.use(chaiAsPromised);
chai.use(sinonChai);
const rewire = require('rewire');
var comments = rewire('../../MVC/commentController');
const mongoose = require('mongoose');

const sandbox = sinon.sandbox.create();


describe("Test MVC for comment requests", () => {

  afterEach(
    () => {
      sandbox.restore();
      comments = rewire('../../MVC/commentController.js');
    }
  );

  context("savecomment function", () => {
    let saveStub, FakeCommentUserClass, result;
    let sampleComment = {
      username: "foo",
      imagePath: "foofoo",
      createdAt: "28foo",
      content: "fooo",
      creator_id: "4587",
      postId: "7854"
    };

    beforeEach(async () => {
      saveStub = sandbox.stub().resolves(sampleComment);
      FakeCommentUserClass = sandbox.stub().returns({
        save: saveStub
      });

      comments.__set__('Comment', FakeCommentUserClass);
      result = await comments.saveComment({
        body: sampleComment
      });
    });

    it("should call the Comment Class", (done) => {
      expect(FakeCommentUserClass).to.have.been.calledWithNew;
      expect(FakeCommentUserClass).to.have.been.calledWith(sampleComment);
      done();
    });

    it("should call the save Stub", (done) => {
      expect(saveStub).to.have.been.called;
      done();
    });

    it("should reject all the errors.", async (done) => {
      saveStub.rejects(new Error('Invalid data.'));

      await expect(comments.saveComment({
        body: sampleComment
      })).to.eventually.be.rejectedWith("Invalid data.");
      done();
    });
  });
});
