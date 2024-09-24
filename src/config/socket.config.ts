// import { WebSocketServer, WebSocket } from 'ws';
// import { createServer, Server as HttpServer } from 'http';
// import type { Express } from 'express';

// let wss: WebSocketServer;

// export const initializeSocket = (app: Express): HttpServer => {
//   const server = createServer(app);
//   wss = new WebSocketServer({ server });

//   wss.on('connection', (ws: WebSocket) => {
//     console.log('A user connected');

//     ws.on('close', () => {
//       console.log('A user disconnected');
//     });
//   });

//   return server;
// };

// export const getWsInstance = (): WebSocketServer => {
//   if (!wss) {
//     throw new Error('WebSocket server instance has not been initialized!');
//   }
//   return wss;
// };

// export default {
//   initializeSocket,
//   getWsInstance,
// };

//* Ws Replacement code with socket.io */

import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import type { Express } from 'express';

let io: SocketIOServer;

export const initializeSocket = (app: Express): HttpServer => {
  const server = createServer(app);

  io = new SocketIOServer(server, {
    pingInterval: 10000,
    pingTimeout: 60000, //1 minute
    cors: {
      origin: '*',
    },
  });
  console.log('Socket initialized');

  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return server;
};

export const getIoInstance = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO server instance has not been initialized!');
  }
  return io;
};

export default {
  initializeSocket,
  getIoInstance,
};
