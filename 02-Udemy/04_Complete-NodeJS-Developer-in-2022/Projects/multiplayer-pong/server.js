const {apiServer} = require('./api');
const http = require('http');
const io = require('socket.io');
const {listen} = require('./sockets');
require('dotenv').config();

const httpServer = http.createServer(apiServer);

const socketServer = io(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT);

console.log(`Listening on port ${PORT}...`);

listen(socketServer);
