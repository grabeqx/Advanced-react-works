require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start({
  cors: {
    credencials: true,
    origin: process.env.FRONTEND_URL
  }
}, seets => {
  console.log('server running');
})