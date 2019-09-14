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

const {
  User
} = require('./models/user');

const multer = require('multer');
const jwt = require('jsonwebtoken');

const {
  authorization
} = require('./middleware/authorization');

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

app.get('/posts', async (request, response) => {

  const pageSize = +request.query.pagesize;
  const currentPage = +request.query.page;
  const query = Post.find({});
  var fetchedPosts;

  if (pageSize && currentPage) {
    query
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  query
    .then(
      (posts) => {
        fetchedPosts = posts;
        return Post.count();
      }
    )
    .then(
      (count) => {

        response.json({
          status: "The data was sent successfully",
          content: fetchedPosts,
          maxPosts: count
        })
      }
    )
    .catch(
      (err) => {
        response.status(400).send({
          error: err
        })
      }
    )
});

app.post('/posts', authorization, multer({
  storage: storage
}).single('image'), (request, response) => {

  let body = _.pick(request.body, ['title', 'content']);
  const url = request.protocol + "://" + request.get("host");

  let id = request.user._id.toString();

  let postBody = {
    title: body.title !== 'null' ? body.title : undefined,
    content: body.content !== 'null' ? body.content : undefined,
    imagePath: url + "/images/" + request.file.filename,
    creator_id: id
  }

  let post = new Post(postBody);

  post.save().then(
    (result) => {
      response.status(201).send({
        message: "The data was stored successfully",
        post: {
          id: result._id,
          title: result.title,
          content: result.content,
          imagePath: result.imagePath,
          creator_id: id
        }
      })
    }
  ).catch(
    (error) => {
      response.status(400).send({
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

app.delete('/posts/:id', authorization, (request, response) => {

  let id = request.params.id;
  let userId = request.user._id;

  Post.findOneAndDelete({
      _id: id,
      creator_id: userId
    })
    .then(
      (result) => {
        if (result) {
          console.log(result);
          response.status(200).send(result);
        } else {
          response.status(401).send({
            err: "Post could not be deleted."
          });
        }
      });
});

app.patch('/posts/:id', authorization, multer({
  storage: storage
}).single('image'), (request, response) => {

  let id = request.params.id;
  let userId = request.user._id;

  let body = _.pick(request.body, ['title', 'content']);
  const url = request.protocol + "://" + request.get("host");

  let postBody = {
    ...body,
    imagePath: url + "/images/" + request.file.filename
  }

  Post.findOneAndUpdate({
    _id: id,
    creator_id: userId
  }, {
    $set: postBody
  }, {
    new: true
  }).then(
    (result) => {
      if (result) {
        response.status(200).send({
          success: "Post has been updated.",
          post: result
        })
      } else {
        response.status(401).send({
          error: "The user cannot edit this post."
        });
      }
    }
  ).catch(
    (error) => {
      response.send(error);
    }
  );

});

// ------------------------------User Requests---------------------------------------//

app.post('/user', (request, response) => {

  let body = _.pick(request.body, ['username', 'email', 'password']);
  let user = new User(body);

  user.save().then(
    (result) => {
      if (result) {
        response.status(200).send({
          status: "The data was saved successfully",
          user: result
        })
      } else {
        response.status(400).send({
          status: "An error was encountered. Please try again.",
          user: null
        })
      }
    }
  ).catch(
    (error) => {
      response.status(400).send({
        error: error
      })
    }
  )
});

app.post('/auth/login', (request, response) => {

  let body = _.pick(request.body, ['email', 'password']);

  User.findUserWithEmailAndPassword(body.email, body.password).then(
    (user) => {

      let access = 'auth';
      let token = jwt.sign({
        _id: user._id.toHexString(),
        access
      }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      }).toString();

      let userId = user._id.toString();

      response.status(200).send({
        success: "The user has been logged in successfully",
        user: user,
        token: token,
        expiresIn: 3600,
        creator_id: userId
      });

    }
  ).catch(
    (error) => {
      response.status(404).send({
        status: "Email or password is invalid.",
        error: error
      })
    }
  )
})


module.exports = app
