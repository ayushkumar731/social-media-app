# Social Media Api

> I create API of social media app like instagram etc.It is fully function which is mention of features section go through that.

## Table Of Content

- [Features](#Features)
- [Technology Used](#Technology-Used)
- [Folder Structure](#Folder-Structure)
- [Quick Start](#Quick-Start)

## Features

- sign up with name ,emailId ,password and confirm password.
- when user created then user get an email for the email verifaction.Without verification user cannot use application.
- login with emailId and password.
- forgot password(User receive an email to reset the password).
- Update current User data like name ,email, profilePic.
- Update Password when user wants to change your password.
- User can logout.
- Get current User data
- Delete User from Database and all activity also deleted by the particular User like posts,comments,likes etc..
- There is a "POST" features where User can post content as well as photo(single pic).
- User can "Update (content,photo) Post" ,"Delete(all related information with particular post also deleted) Post"
- Get All the "Post" by userId as well as without id.
- There is "Comment" for each "Post" where User can only write content.
- User can "Update (content) Comment" ,"Delte(all related info with related comment also deleted) Comment.
- User can get all comments by the userId as well as PostId.
- User get All Comments.
- Like feature for the "Posts" as well as "Comments".If allready liked then User can dislike also.
- friendShip functionality where user can folloe other user as a friend and if allready follow friend then can unfollow also.
- User can also search other user by letter or name(eg. if user type "a" or "A" then User gets all the Users whose name starts with "A" .If User type full name like "John" then User gets all other Users whose name will "John").

## Technology Used

| Technology      | Version |
| --------------- | ------- |
| bcryptjs        | 2.4.3   |
| body-parser     | 1.19.0  |
| cookie-parser   | 1.4.5   |
| cors            | 2.8.5   |
| crypto          | 1.0.1   |
| dotenv          | 8.2.0   |
| express         | 4.17.1  |
| express-session | 1.17.1  |
| jsonwebtoken    | 8.5.1   |
| mongoose        | 5.10.2  |
| multer          | 1.4.2   |
| nodemailer      | 6.4.11  |
| nodemon         | 2.0.4   |
| passport        | 0.4.1   |
| passport-jwt    | 4.0.0   |
| sharp           | 0.26.0  |

## Folder Structure

```
social-media-app
├─ assets
│  └─ img
│     └─ users
│        ├─ default.jpg
│        ├─ user-5f5e2e186e3a162e18e494ab-1600008397368.jpeg
│        └─ user-5f5e313733ef59373c2d04e3-1600008602037.jpeg
├─ config
│  ├─ AppError.js
│  ├─ catchAsynch.js
│  ├─ mongoose.js
│  ├─ nodemailer.js
│  └─ passport-jwt-strategy.js
├─ controllers
│  ├─ api
│  │  └─ v1
│  │     ├─ authController.js
│  │     ├─ commentController.js
│  │     ├─ friendController.js
│  │     ├─ handleFactory.js
│  │     ├─ likeController.js
│  │     ├─ postController.js
│  │     ├─ searchController.js
│  │     └─ userController.js
│  └─ errorController.js
├─ models
│  ├─ comments.js
│  ├─ friendships.js
│  ├─ likes.js
│  ├─ posts.js
│  └─ user.js
├─ routes
│  ├─ api
│  │  ├─ v1
│  │  │  ├─ comment.js
│  │  │  ├─ friend.js
│  │  │  ├─ index.js
│  │  │  ├─ like.js
│  │  │  ├─ post.js
│  │  │  ├─ search.js
│  │  │  └─ user.js
│  │  └─ index.js
│  └─ index.js
├─ .gitignore
├─ app.js
├─ package-lock.json
├─ package.json
├─ readme.md
└─ server.js
```

## Quick Start

### Prerequisites

- [NodeJs](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)
- CLI (Command Line Interface)
- [Git](https://git-scm.com/downloads)

**Clone the repository with the below command:**

```bash
   git clone https://github.com/ayushkumar731/social-media-app.git
```

**Into the project directory**

```
    cd social-media-app
```

**Install npn dependencies**

```bash
    npm install
```

**Set your all id's password ,secret key etc. in config.env file'**

- DATABASE_URL=Your Atlas MongoDB link or you can use local database
- DATABASE_PASSWORD=If You are using Atlas then provide your Database Password

- JWT_SECRET_KEY=Provide random 32bit string or using website for best choice [randomkeygen](https://randomkeygen.com/)

- JWT_EXPIRES_IN=set the day as you want(eg. 30d)

- JWT_COOKIE_EXPIRES_IN=set the day as you want(eg. 30)

- EMAIL_USERNAME=Your email address(your email should be less secture toggle on visite this links to on the toggle [lesssecureapp](https://myaccount.google.com/lesssecureapps))

- EMAIL_PASSWORD=Your email password
- EMAIL_HOST=stmp.gmail.com(default for gmail)
- EMAIL_PORT=587
- EMAIL_FROM=Your email address

**Start project by using command below**

```bash
    npm start
```

**The Server now be running at** http://localhost:80/

**_Open Postman App and use following routes_**

- POST -> **/api/v1/user/create** (to signup the user)
- GET -> **/api/v1/user/email-verify/tokenId** (to veify the email id.User receive token at the end of url.Paste it in place of tokenId and verify the user).
- POST -> **/api/v1/user/create-session** (to login the user).
- POST -> **/api/v1/user/logout** (to logout the user).
- POST -> **/api/v1/user/forgot-password** (to forget the password.User receive an email).
- POST -> **localhost/api/v1/user/reset-password/tokenId** (to reset the password paste the token id instead of tokenId which received in the mail)
- POST -> **/api/v1/user/update-password** (to update the password).
- POST -> **/api/v1/post** (to create Post)
- PATCH -> **/api/v1/post/id** (to update the post with the id.Please paste the id of Post which you want to update istead of **id**).
- DELETE -> **/api/v1/post/id** (to delete the post with the **id**).
- GET -> **/api/v1/post/id** (to get the post by User **id**).
- GET -> **/api/v1/post** (get all post).
- POST -> **/api/v1/comment/id** (to create a comment by **Post Id**).
- PATCH -> **/api/v1/comment/id** (to update the comments with the **comment id**).
- DELETE -> **/api/v1/comment/id** (to delete the comment with the **comment id**).
- GET -> **/api/v1/comment/id** (to get the comment with the **User id**).
- GET -> **/api/v1/comment** (to get the all comments).
- GET -> **/api/v1/comment/post/id** (to get the comments by **Post id**).
- POST -> **/api/v1/like?id=postId&type=Post** (to like or unlike the post.paste the id of Post instead of **postId**).
- POST -> **/api/v1/like?id=commentId&type=Comment** (to like or unlike the comment.paste the id of comment instead of **commentId**).
- POST -> **/api/v1/friend?id=otherUserId** (to add or remove friend use other **User Id** instead of **otherUserId**).
- GET -> **/api/v1/search/ay** (to search other User. You can use any letter after **/seach**. eg. **ay**).
- GET -> **/api/v1/user/profile/me** (to get the currrent user profile).
- GET -> **/api/v1/user/profile/userId** (to get the information of other user .paste the id of **other user** instead of **userId**).
- Delete -> **/api/v1/user/profile/me** (to delete the current user from database and also all activity deleted).
- PATCH -> **/api/v1/user/profile/me** (to update the current profile like name,email,photo).