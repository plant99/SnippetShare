# SnippetShare

An online platform to share code snippets.

## Overview

This project was started as a part of the induction procedure for Delta Force, NIT Trichy. Following is an overview of what the web app does:
- User must be registered and logged in to create snippet
- Snippets can be created manually, or uploaded from a file
- While creating a snippet, a user can:
  - Set header for the snippet
  - Add the snippet
  - Set expiry for it
  - Set language to beautify the snippet
  - Set the type of post
    - `public` : Any client can view the post
    -  `private` : Only the author of the snippet can view the post
  - Set his anonimity while others try to view his snippet
- Any client can view those snippets
- Syntax highlight is enabled once the user sets the Language
- The profile of a registered user, which is accessible to the same user, is a lists of the post he made.

## Routes (GET)

- `/login` Landing page for non-registered/ non-logged users
- `/signup` Page for an user to signup
- `/add_new` Serves page to create snippet manually
- `/add_new/file` Serves page to upload snippet
- `/profile` Serves page with a list of all snippets created by the user logged in at that instance
- `/view_snippet/<pathOfSnippet>` Serves the snippet for viewing purposes with the unique path name

## Models(MongoDB)

###### User

An User has the following fields

- username
- password
- type
- moderated

In ```mongoose``` ( a middleware to interact with ```MongoDB``` from ```Node JS``` ), above collection can be modelled in the following way.

```javascript
mongoose.model('user', new Schema({
	username: String ,
	password: String ,
	codes: Array
}))
```

###### Code

A Code has the following fields

- header
- content
- type
- owner
- url
- language
- expiresAt
- anonimity

In ```mongoose```, above collection can be modelled in the following way.

```javascript
var Code = mongoose.model('code', new Schema({
	header:String,
	content: String,
	type: String,
	owner: String,
	url: String,
	language: String,
	expiresAt: Number,
	anonimity: Boolean
}))
```

## Dependencies 

- [Express](http://expressjs.com/)
	A framework written over Node JS.
- [Body-Parser](https://www.npmjs.com/package/body-parser)
	Middleware to parse request body
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
	Middleware to parse cookies
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
	Middleware to handle file uploads.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
	Middleware to generate and verify web-tokens.
- [mongoose](https://www.npmjs.com/package/mongoose)
	Library to interact efficiently with MongoDB
- [nodemon](https://www.npmjs.com/package/nodemon)
	Keeps track of file-changes and restarts server after every change in server cde
- [path](https://nodejs.org/api/path.html)
	Helps merging paths efficiently
- [morgan]()
	Helps to log requests details to console
- [bcrypt](https://www.npmjs.com/package/bcrypt)
	Helps to hash passwords and compare them when requested.
- [captchapng](https://www.npmjs.com/package/captchapng)
	Generates png captcha image of numbers having arbitrary shapes and positions.
- **This list doesn't include the sub-dependencies required by above libraries, they are auto-generated**

## Front-End libraries

- [jQuery](http://api.jquery.com/) Library for javaScript
- [jQuery-cookie](https://github.com/carhartl/jquery-cookie) Library to set, get, modify and delete cookies with jQuery.
- [js-cookie](https://github.com/js-cookie/js-cookie) Library to set, get, modify and delete cookies with JavaScript.
