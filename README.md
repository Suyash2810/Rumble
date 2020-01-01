# Rumble

## Introduction

Posteoid is a Single Page Web Application built using Angular and NodeJs with mongodb as the database using _mongoose_ module. It is **simple**, **fast**, **secure** web app for blogging. It has _minimalistic_, _responsive_ and _user-friendly_ interface where users can create as many posts after registering. 

The app also provides the functionality of editing and deleting the posts by the creator of the post. The posts made are public and anyone can read the posts whereas the comments can be made by logged in users. 

## Description

### Home

The home page welcomes the user and displays date/time, updates in the app and weather details of the place. The [openweathermap](https://openweathermap.org/api) api has been used to fetch weather data.

![Home](./readme_images/home_page.png)

### Contact

The Contact Component is responsible for giving information about the creator of the app. Moreover the other two components help in submitting any queries:exclamation: a user has regarding the app. The queries are displayed in **Contact List Component**. :+1:

![Home](./readme_images/contact_component.png)

The queries can also be searched through tags in **Contact List Component** and a user can see their own submissions using slider button and can delete them too.  

Contact List            |  Search            |  Personal Queries            |  View Query
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![Contact](./readme_images/contact_list1.png)  |  ![Contact](./readme_images/contact_list2.png)  |  ![Contact](./readme_images/contact_list3.png)  |  ![Contact](./readme_images/contact_list4.png)

### Login and Resgister

To use the various functionalitites of the app one has to register. The registration option is available on the *Register* page accessible through _navigation bar_. Error validation of the input is done and when the data is correct, it is stored in the database.

Sign In           |  Register           |  Logged Out            
:-------------------------:|:-------------------------:|:-------------------------:
![Sign In](./readme_images/sign_in.png)  |  ![Register](./readme_images/register.png)  |  ![Logged Out](./readme_images/log_out.png)

#### Features

##### Security - Encryption

The password of the respective user is encrypted and then stored in the database. During authentication the entered password is encrytped and then compared hence no decryption takes place.

##### Identity - Tokenization

When the user logs in, after validation of the login information a **token** is generated for the particular user. Sign in once and the app keeps you logged in for **1 hour**. After that the token will expire and the user is logged out.  
**Interceptors** are used in the front end to _manipulate_ the requests to the back end by adding the token of the user. Detailed _error validation_ has also been done with display of messages to the user.

### Post

The **Post List Component** displays the posts created by different users. The posts are accessible to the public. Paginator has been implemented to access posts on the next page. _Posts per page_ can also be changed.

Post List          |  Post List                       
:-------------------------:|:-------------------------:
![Post List](./readme_images/post_list1.png)  |  ![Post List](./readme_images/post_list2.png)

#### Features

##### Edit and Delete Post

The post can be edited or deleted. Moreover only the user has the authority to edit or delete the post. Others will not be allowed. 

Appropriate error or success messages are displayed.

Edit/Delete           |  Edit           |  Edit            
:-------------------------:|:-------------------------:|:-------------------------:
![Sign In](./readme_images/edit_delete.png)  |  ![Register](./readme_images/edit1.png)  |  ![Logged Out](./readme_images/edit2.png)

##### Post View Component and Post Create Component

This is the section where the user can access the entire post. The post can also be favorited by any user using the heart emoji. The post will then be added to the **favorite section** of the respective user.

Post View          |  Post View          |  Post Create                       
:-------------------------:|:-------------------------:|:-------------------------:
![Post List](./readme_images/post_view.png)  |  ![Post List](./readme_images/post_view1.png)  |  ![Post Create](./readme_images/new_post.png)

#### Comment Panel 

>Following are the **features** of the Comment Panel.

![Comment](./readme_images/comment_panel.png)

1. Only logged in users can comment on the post.
2. The comment can also be deleted. Only the respective user can delete the comment. Others will not be allowed.
3. The user image is automatically loaded from the database in the comment section.
4. The feature to _disable_ comments has been provided.
5. **Rich Text Editor** has been provided which can be maximized to screen size as per need.
6. **Sub Comment Component** has been used to add replies to various comments.

>See the images below.

Disabled Comment Section         |  Sub Reply Component                      
:-------------------------:|:-------------------------:
![Comment](./readme_images/disabled_comments.png)  |  ![Comment](./readme_images/sub_comment.png)

>The maximized view of Rich Text Editor is shown below.

![Comment](./readme_images/editor.png)

>The comments can be edited by the user.

![Comment](./readme_images/edit_comment.png)

### Profile

The *Profile Component* displays information particular to the logged in user. It consists of the following components.

#### Profile Image

In this component the user can change the profile picture.

![Comment](./readme_images/profile_image.png)

#### Account Component

Here the user can perform the account related actions. Handling of personal data is done here. 

> There are four components here which the user can navigate through.

1. **Favorite Posts Component**: All the posts favorited by the user are displayed here.
2. **Notes Component**: The user can create notes and save them as per requirement. 
3. **Change/Update Component**: To update or change the login information.
4. **Delete Account Component**: The account can be deleted with all the user data from here.

Favorite           |  Notes            
:-------------------------:|:-------------------------:
![Favorite](./readme_images/favorite_sec.png)  |  ![Notes](./readme_images/note_sec.png)

Update            |  Delete
|:-------------------------:|:-------------------------:
![Update](./readme_images/update_sec.png)  |  ![Delete](./readme_images/delete_sec.png)

#### My Posts

The posts made by the user are displayed here. The user can directly access the posts from this component.

![My Posts](./readme_images/my_posts.png)

## Prerequisites

To run the project in local enviroment one will need the following things: 

**Angular CLI** must bee installed in the system. Check [here](https://cli.angular.io/) for downloading. 

**Node Package Manager** to be installed in the system. To install it in the system click [here](https://www.npmjs.com/get-npm). 

**NodeJs** is required. Download from [here](https://nodejs.org/en/download/)

**MongoDB** is required to store all the data used in the app. Download from [here](https://www.mongodb.com/download-center)

Any text editor would work, I prefer **Visual Studio Code**. Download from [here](https://code.visualstudio.com/download)

Now when the above are downloaded successfully, open the project in VSC and using the terminal run the command **npm install**. This will install all the required dependencies. 

## Running the program

First be sure that the mongodb database server is on and listening at localhost:27017.
To run the app follow the steps given below:

```
1. Open a terminal
2. Go the project directory
3. Run the command 'npm install' to download all the dependencies.
4. Wait for the download to complete.
5. Run the command 'nodemon server.js' by opening another terminal in same directory.
6. Open another terminal in the same directory and run the command 'ng serve'
7. Open the browser and go to url 'localhost:4200'
8. The app will open.
```

## Testing

To test the model files run the command _npm run test-watch_. Approximately 100 tests have been implemented in this project.

## Author

* **Suyash Awasthi** - *Initial work* - [suyash2810](https://github.com/suyash2810)
