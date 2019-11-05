const {
  Comment
} = require('../models/comments');

const {
  comments,
  populateComments,
  user1Token,
  user2Token
} = require('./Test/comment.mvc.seed');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const moment = require('moment');
