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

const multer = require('multer');


const {
  authorization
} = require('./middleware/authorization');

const UserController = require('./MVC/userController');
const PostController = require('./MVC/postController');

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

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("MIME type error.");
    if (isValid) {
      error = null;
    }

    callback(error, './BackEnd/public/images');
  },
  filename: (request, file, callback) => {
    const filename = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, filename + "_" + Date.now() + "." + ext);
  }
})


app.get('/', (request, response) => {

  response.send({
    success: "The server is listening at port.",
    port: "Connected to port 3000"
  });
});

// ------------------------------Post Requests---------------------------------------//

app.get('/posts', PostController.getPosts);

app.post('/posts', authorization, multer({
  storage: storage
}).single('image'), PostController.savePost);

app.get('/post/:id', PostController.getPostById);

app.delete('/posts/:id', authorization, PostController.deletePost);

app.patch('/posts/:id', authorization, multer({
  storage: storage
}).single('image'), PostController.updatePost);

// ------------------------------User Requests---------------------------------------//

app.post('/user', UserController.createUser);

app.post('/auth/login', UserController.userLogin);


module.exports = app
