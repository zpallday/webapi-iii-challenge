const express = require('express');
const server = express()

// const userRouter = require('./users/userRouter.js');



server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
console.log(` ${req.method} to ${req.url}`)
next();
};

server.use(logger)
server.use(express.json())

module.exports = server;
