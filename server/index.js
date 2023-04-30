const http = require('http');
// 1
const { Server } = require('socket.io');

const app = require('./app');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);
// 2
const io = new Server(httpServer);
// 3
// io.on('подія',()=>{}) - підписка на подію
// io.emit('подія', payload) - генерація події (для усих)
// socket.emit('подія', payload) - генерація події (для socket)
// socket.broadcast.emit('подія', payload) - генерація події (для усих крім socket)
io.on('connection', socket => {
  console.log('Connection established');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
