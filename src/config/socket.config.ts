import { WebSocketServer, WebSocket } from 'ws';
import { createServer, Server as HttpServer } from 'http';
import type { Express } from 'express';

let wss: WebSocketServer;

export const initializeSocket = (app: Express): HttpServer => {
  const server = createServer(app);
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('A user connected');

    ws.on('message', (message: string) => {
      console.log('received: %s', message);
    });

    ws.on('close', () => {
      console.log('A user disconnected');
    });
  });

  return server;
};

export const getWsInstance = (): WebSocketServer => {
  if (!wss) {
    throw new Error('WebSocket server instance has not been initialized!');
  }
  return wss;
};

export default {
  initializeSocket,
  getWsInstance,
};
