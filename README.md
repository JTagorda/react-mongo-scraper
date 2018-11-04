# react-mongo-scraper
Scraped-pi is a news feed app that monitors posts from /r/raspberry-pi/ reddit forum for developers interested IoT and other uses that the raspberry pi has. Save the posts that peak your interest to revisit later. Leave notes on posts to inform your raspberry pi projects. Built on the MERN stack.

### Technologies 

* Node.js - Server-side javascript
* Express.js - A framework for Node.js
* Axios - An http client that can be used server-side 
* Cheerio - Jquery designed for server 
* React.js - Javascript library for UIs (front-end)
* React Router DOM - Client Side Routing
* MongoDB - NoSql Database
* Mongoose - ODM for MongoDB
* Passport - User Authentication

### How it works - Simple Overview

A get request is made by axios that receives the DOM (document-object model) of /r/rasberry-pi/ forum. Cheerio then captures each post's headline, link, and summary. That data is then stored in the MongoDB database (with some additional property names and values assigned to it) via mongoose ODM. 

A RESTful api is then constructed to handle request and response between the client and server. Adding a note, updating an article, and adding an article to your saved articles are examples of using the api architecture. React.js is used as the view-engine to render the client (browser for users). 

### Link to project 

(Scraped-Pi) (https://scraped-pi-react.herokuapp.com/)

Login:

`Username: ScrapedPi, Password: ScrapedPi`

### For You

If you would like to modify this project for your own purposes, you can fork the repo. After the project is cloned to your repo make sure to download the dependencies by running `npm i` or `yarn install` in your terminal window for both package.json files in the global scope and client folder respectively.

In some cases, the server.js file will need to be modified. In the server.js file you may need to change the port the app is listening on or change the mongoose connection for your local machine. Also in the client folder, make sure to update the "proxy" field to match the port your server is listening on. This is so your react app can establish a connection with the api. Other than that, you should be able to modify and build on this project.  

### Contributors & Maintenance of Scraped-Pi
This project is maintained by myself. I plan to add private notes for users and giving users the ability to create project resource tabs. Users will be able to place their saved articles into these resource tabs for their reference when working on their personal raspberry pi projects. I then would like to give users the ability to make these resource tabs public to the wider community.

