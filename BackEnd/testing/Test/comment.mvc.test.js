const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
chai.use(chaiAsPromised);
chai.use(sinonChai);
const rewire = require('rewire');
const app = rewire('../../app.js');

const mongoose = require('mongoose');

const sandbox = sinon.sandbox.create();
