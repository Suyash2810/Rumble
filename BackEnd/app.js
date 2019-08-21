const express = require('express');
const app = express();

app.get('/', (request, response) => {

  response.send({
    success: "The server is listening at port."
  });
});

module.exports = app
