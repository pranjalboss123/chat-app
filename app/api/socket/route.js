import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('message', (message) => {
        io.emit('message', message);
      });
    });
  }
  res.end();
};

export const GET = ioHandler;