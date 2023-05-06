const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { Message } = require('./models');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

const cors = { origin: '*' };
const io = new Server(httpServer, { cors });

// io|socket.on('подія',()=>{}) - підписка на подію
// io.emit('подія', payload) - генерація події (для усих)
// socket.emit('подія', payload) - генерація події (для socket)
// socket.broadcast.emit('подія', payload) - генерація події (для усих крім socket)

io.on('connection', socket => {
  console.log('Connection established');

  const createMessageHandler = async message => {
    // save to db
    try {
      const createdMessage = await Message.create(message);
      // send to users
      io.emit('MESSAGE_CREATED', createdMessage);
    } catch (err) {
      socket.emit('CREATE_MESSAGE_ERROR', err);
    }
  };

  socket.on('CREATE_MESSAGE', createMessageHandler);

  // -------- THEORY + EXAMPLES ---------------------------------
  socket.broadcast.emit('ADD_NEW_MEMBER', 'A new user connected');
  socket.emit('NEW_USER_WELLCOME', 'Hello on our server)');
  io.emit('EVENT_FOR_ALL', 'I am server');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
