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