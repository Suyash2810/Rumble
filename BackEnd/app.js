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
const ContactController = require('./MVC/contactController');
const ReplyController = require('./MVC/replyController');
const favoriteController = require('./MVC/favoriteController');
const NoteController = require('./MVC/NoteController');
const ViewFavController = require('./MVC/viewFavController');

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
const multerUserImageExtract = require('./middleware/multeruserImage');

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

app.get('/getUserPosts', authorization, PostController.getPostsByUserId);

// ------------------------------User Requests---------------------------------------//

app.post('/user', UserController.createUser);

app.post('/auth/login', UserController.userLogin);

app.get('/getUser', authorization, UserController.getUserInfo);

app.patch('/updateUserImage/:userId', authorization, multerUserImageExtract, UserController.updateUserImage);

// ------------------------------Comment Requests---------------------------------------//

app.post('/comment', CommentController.saveComment);

app.get('/comment/:postId', CommentController.getComments);

app.get('/commentById/:id', authorization, CommentController.getCommentById);

app.patch('/updateComment/:id', authorization, CommentController.updateCommentById);

app.delete('/commentDelete/:id/:creatorId', authorization, CommentController.commentDelete);

// ------------------------------Contact Requests---------------------------------------//

app.post('/contact', ContactController.saveContact);

app.get('/contacts', ContactController.getContacts);

app.delete('/contact/:id', authorization, ContactController.deleteContact);

app.get('/contact/:id', ContactController.getContactById);

// ------------------------------Reply Requests---------------------------------------//

app.post('/reply', authorization, ReplyController.saveReply);

app.get('/reply/:postId/:parent_Id', ReplyController.getSpecificSubReplies);

app.delete('/reply/:postId/:parent_Id', ReplyController.deleteSpecificReplies);

// ------------------------------Favorite Requests---------------------------------------//

app.get('/favorites', authorization, favoriteController.getFavorites);

app.post('/favorite', authorization, favoriteController.addfavorite);

app.delete('/favorite/:postId', authorization, favoriteController.removefavorite);

app.get('/getFavoriteById/:postId/:userId', authorization, favoriteController.getFavoriteById);

// ------------------------------Note Requests---------------------------------------//

app.get('/note', authorization, NoteController.getNotes);

app.post('/note', authorization, NoteController.saveNote);

app.delete('/note/:id', authorization, NoteController.deleteNote);

// ------------------------------User Update Requests---------------------------------------//

app.patch('/updateUserInfo', authorization, UserController.updateUserInfo);

app.delete('/deleteUserAccount', authorization, UserController.deleteUserAccount);


// ------------------------------Post Data (Views/Favorites) Requests---------------------------------------//

app.get('/getPostViewData', ViewFavController.getPostData);

app.post('/createViewFavData', ViewFavController.savePostData);

app.patch('/updateViewData', ViewFavController.updatePostData);

app.patch('/updateFavData', ViewFavController.updateFavoriteData);

app.delete('/deleteViewFavData/:post_id', ViewFavController.deleteViewFavData);

module.exports = app
