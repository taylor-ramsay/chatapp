# Chat App
A basic chat app using Express, MongoDB, SocketIO on the backend and React on the front end.

## Getting Started
Dependencies:
- Docker
- Git

Get started by cloning this repo onto your local instance:
`git clone https://github.com/taylor-ramsay/chatapp.git`

Navigate to to the root folder and run the following commands to setup the frontend:
`cd frontend`
`npm install`
`npm start`

Navigate back to the root folder and run the following commands to setup the backend:
`cd backend`
`docker-compose up -d`

## How to use
To use the app first register your user and then login. Once logged in search for other registered users in the search input on the top left. In order to start a group chat, you can click the 'Select multiple' checkbox and select the users you would like to chat with. Once the users are selected, click on 'Start a new conversation' to begin your chat. To send a message, fill out the input and hit send. The users on the other end of the chat will show an open conversation and will need to click into the conversation in order to see the message.

## Resources
- https://app.pluralsight.com/library/courses/real-time-web-nodejs/table-of-contents
- https://dev.to/jay97/docker-compose-an-express-and-mongo-app-aai
- https://socket.io/docs/
- https://mongoosejs.com/docs/
- https://react-bootstrap.netlify.com/
- https://reactjs.org/docs/context.html
- https://stackoverflow.com/questions/11356001/socket-io-private-message
- https://github.com/ericgio/react-bootstrap-typeahead/tree/master/docs
- https://stackoverflow.com/questions/41501939/how-to-update-a-array-value-in-mongoose
- https://www.npmjs.com/package/bcrypt