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
  Post
} = require('./models/post');

const multer = require('multer');

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

    callback(error, './BackEnd/images');
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

app.get('/posts', async (request, response) => {

  let posts = await Post.find({});

  response.json({
    status: "The data was sent successfully.",
    content: posts
  });
});

app.post('/posts', multer({
  storage: storage
}).single('image'), (request, response) => {

  let body = _.pick(request.body, ['title', 'content']);

  let postBody = {
    title: body.title,
    content: body.content
  }

  let post = new Post(postBody);

  post.save().then(
    (result) => {
      if (!result) {
        response.send({
          error: "Something went wrong."
        })
      } else {
        response.status(201).send({
          message: "The data was stored successfully",
          post: result
        })
      }
    }
  ).catch(
    (error) => {
      response.send({
        error: error
      })
    }
  )
});

app.get('/post/:id', async (request, response) => {

  let id = request.params.id;

  let post = await Post.findById(id);

  if (post) {
    response.status(200).send({
      success: "The post has been fetched from the database.",
      post: post
    })
  } else {
    response.send({
      err: "The post could not be fetched from the database. Error has been encountered."
    })
  }
})

app.delete('/posts/:id', (request, response) => {

  let id = request.params.id;

  Post.findByIdAndDelete(id)
    .then(
      (result) => {
        if (result) {
          console.log(result);
          response.status(200).send(result);
        } else {
          response.status.send({
            err: "Post could not be deleted."
          });
        }
      });
});

app.patch('/posts/:id', (request, response) => {

  let id = request.params.id;
  let postBody = request.body;
  console.log(postBody);

  Post.findOneAndUpdate({
    _id: id
  }, {
    $set: postBody
  }, {
    new: true
  }).then(
    (result) => {
      response.status(200).send({
        success: "Post has been updated.",
        post: result
      })
    }
  ).catch(
    (error) => {
      response.send(error);
    }
  );

});

module.exports = app
