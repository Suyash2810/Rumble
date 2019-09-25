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

const {
  authorization
} = require('./middleware/authorization');

const UserController = require('./MVC/userController');
const PostController = require('./MVC/postController');
const CommentController = require('./MVC/commentController');

app.use(body_parser.json());
app.use(body_parser.urlencoded({
  extended: false
}));

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authaccess");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use(express.static(__dirname + "/public"));

const multerFileExtract = require('./middleware/multerFilePath');

app.get('/', (request, response) => {

  response.send({
    success: "The server is listening at port.",
    port: "Connected to port 3000"
  });
});

// ------------------------------Post Requests---------------------------------------//

app.get('/posts', PostController.getPosts);

app.post('/posts', authorization, multerFileExtract, PostController.savePost);

app.get('/post/:id', PostController.getPostById);

app.delete('/posts/:id', authorization, PostController.deletePost);

app.patch('/posts/:id', authorization, multerFileExtract, PostController.updatePost);

app.patch('/post/commentStatus', authorization, PostController.updateCommentStatus);

// ------------------------------User Requests---------------------------------------//

app.post('/user', UserController.createUser);

app.post('/auth/login', UserController.userLogin);

app.get('/getUser', authorization, UserController.getUserInfo);

// ------------------------------Comment Requests---------------------------------------//

app.post('/comment', CommentController.saveComment);

app.get('/comment/:postId', CommentController.getComments);

module.exports = app
