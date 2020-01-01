# Rumble

## Introduction

Posteoid is a Single Page Web Application built using Angular and NodeJs with mongodb as the database. It is **simple**, **fast**, **secure** web app for blogging. It has _minimalistic_, _responsive_ and _user-friendly_ interface where users can create as many posts after registering. 

The app also provides the functionality of editing and deleting the posts by the creator of the post. The posts made are public and anyone can read the posts whereas the comments can be made by logged in users. 

## Description

### Home

The home page welcomes the user and displays date/time, updates in the app and weather details of the place. The [openweathermap](https://openweathermap.org/api) api has been used to fetch weather data.

![Home](./readme_images/home_page.png)

### Contact

The Contact Component is responsible for giving information about the creator of the app. Moreover the other two components help in submitting any queries a user has regarding the app. The queries are displayed in **Contact List Component**. 

![Home](./readme_images/contact_component.png)

The queries can also be searched through tags in **Contact List Component** and a user can see their own submissions using slider button and can delete them too.  

Contact List            |  Search            |  Personal Queries            |  View Query
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![Contact](./readme_images/contact_list1.png)  |  ![Contact](./readme_images/contact_list2.png)  |  ![Contact](./readme_images/contact_list3.png)  |  ![Contact](./readme_images/contact_list4.png)