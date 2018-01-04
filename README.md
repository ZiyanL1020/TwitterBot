# TwitterBot
A Twitter bot build with NodeJS, Twitter API and Forismatic API

## Instructions
- Download or clone the source code
- Run ```npm install``` at the root
- Run ```nodemon index.js``` to launch the application

## Functionalities
- Fetch and posted random quote 
- Like tweets with specified tags/contents 
- Reply friendly when followed by other users
- All above can be done at a user-defined frequency

## Update configurations
- Navigate to config.js
  - appConfig contains infomation about your Twitter application
  - parameters contain information to fetch tweets and like
  - timing contains information to define frequency at which above behaviours will take place
