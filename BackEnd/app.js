const express = require('express');
const app = express();

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Acces-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
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

module.exports = app
