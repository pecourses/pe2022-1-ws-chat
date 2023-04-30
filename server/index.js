const http = require('http');
// 1
const { Server } = require('socket.io');

const app = require('./app');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);
// 2
const cors = { origin: '*' };
const io = new Server(httpServer, { cors });
// 3
// io.on('подія',()=>{}) - підписка на подію
// io.emit('подія', payload) - генерація події (для усих)
// socket.emit('подія', payload) - генерація події (для socket)
// socket.broadcast.emit('подія', payload) - генерація події (для усих крім socket)
io.on('connection', socket => {
  console.log('Connection established');
  socket.broadcast.emit('ADD_NEW_MEMBER', 'A new user connected');
  socket.emit('NEW_USER_WELLCOME', 'Hello on our server)');
  io.emit('EVENT_FOR_ALL', 'I am server');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
