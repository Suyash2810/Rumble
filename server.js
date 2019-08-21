const http = require('http');
var app = require('./BackEnd/app');

var server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`The server is listening at port ${port}`);
});
