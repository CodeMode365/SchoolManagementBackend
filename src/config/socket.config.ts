import { WebSocketServer, WebSocket } from 'ws';
import { createServer, Server as HttpServer } from 'http';
import type { Express } from 'express';

let wss: WebSocketServer;

export const initializeSocket = (app: Express): HttpServer => {
  const server = createServer(app);
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('A user connected');

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

//chat room configuration

interface RoomMap {
  [roomId: string]: Set<WebSocket>;
}

class RoomManager {
  private rooms: RoomMap = {};

  public join(roomId: string, ws: WebSocket): void {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = new Set();
    }
    this.rooms[roomId].add(ws);
    console.log(
      `WebSocket joined room ${roomId}. Total clients: ${this.rooms[roomId].size}`
    );
  }

  public leave(roomId: string, ws: WebSocket): void {
    const room = this.rooms[roomId];
    if (room) {
      room.delete(ws);
      console.log(
        `WebSocket left room ${roomId}. Remaining clients: ${room.size}`
      );
      if (room.size === 0) {
        delete this.rooms[roomId]; // Remove the room if empty
        console.log(`Room ${roomId} deleted because it is empty.`);
      }
    }
  }

  public broadcast(roomId: string, message: string, senderWs: WebSocket): void {
    const room = this.rooms[roomId];
    if (room) {
      room.forEach((ws) => {
        if (ws !== senderWs) {
          // Optionally skip sending the message back to the sender
          ws.send(JSON.stringify({ event: 'message', roomId, message }));
        }
      });
    }
  }

  public getRoomSize(roomId: string): number {
    return this.rooms[roomId]?.size || 0;
  }

  public isRoomExists(roomId: string): boolean {
    return !!this.rooms[roomId];
  }
}

export const Room = new RoomManager();
