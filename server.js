const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


app.get('/', (request, response) => {

  response.send({
    Success: "The server is listening at port."
  });
});

app.listen(port, () => {
  console.log(`The server is listening at port ${port}`);
})
