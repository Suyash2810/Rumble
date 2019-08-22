require('./configuration/config');
const express = require('express');
const app = express();
const body_parser = require('body-parser');
const _ = require('lodash');

const {
  mongodb
} = require('mongodb');

const {
  mongoose
} = require('./mongoose/mongoose');

app.use(body_parser.json());
app.use(body_parser.urlencoded({
  extended: false
}));

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.get('/', (request, response) => {

  response.send({
    success: "The server is listening at port.",
    port: "Connected to port 3000"
  });
});

app.get('/posts', (request, response) => {

  const sampleData = [{
      id: "ujhyye987t3sd",
      title: "Silence",
      content: "This is an example of content."
    },
    {
      id: "gdstger3535df",
      title: "Alienation",
      content: "This is an example of content."
    },
    {
      id: "3t5467rgvdhf",
      title: "Confinement",
      content: "This is an example of content."
    },
    {
      id: "762t5ru3vrhf",
      title: "Darkness",
      content: "This is an example of content."
    }
  ];

  response.json({
    status: "The data was sent successfully.",
    content: sampleData
  });
});

app.post('/posts', (request, response) => {

  let post = _.pick(request.body, ['id', 'title', 'content']);
  response.status(201).json({
    message: "The data has been saved successfully.",
    post: post
  });
})

module.exports = app
