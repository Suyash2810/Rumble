const express = require('express');
const app = express();

app.get('/', (request, response) => {

  response.send({
    success: "The server is listening at port.",
    port: "Connected to port 3000"
  });
});

app.get('/posts', (request, response) => {

  const sampleData = [{
      id: "ujhyye987t3sd",
      title: "Title1",
      content: "This is an example of content."
    },
    {
      id: "gdstger3535df",
      title: "Title2",
      content: "This is an example of content."
    },
    {
      id: "3t5467rgvdhf",
      title: "Title3",
      content: "This is an example of content."
    },
    {
      id: "762t5ru3vrhf",
      title: "Title1",
      content: "This is an example of content."
    }
  ];

  response.json({
    status: "The data was sent successfully.",
    content: sampleData
  });
});

module.exports = app
