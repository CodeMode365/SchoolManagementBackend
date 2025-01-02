// interface RoomMap {
//   [roomId: string]: Set<WebSocket>;
// }

// class RoomManager {
//   private rooms: RoomMap = {};

//   public join(roomId: string, ws: WebSocket): void {
//     if (!this.rooms[roomId]) {
//       this.rooms[roomId] = new Set();
//     }
//     this.rooms[roomId].add(ws);
//     console.log(
//       `WebSocket joined room ${roomId}. Total clients: ${this.rooms[roomId].size}`
//     );
//   }

//   public leave(roomId: string, ws: WebSocket): void {
//     const room = this.rooms[roomId];
//     if (room) {
//       room.delete(ws);
//       console.log(
//         `WebSocket left room ${roomId}. Remaining clients: ${room.size}`
//       );
//       if (room.size === 0) {
//         delete this.rooms[roomId]; // Remove the room if empty
//         console.log(`Room ${roomId} deleted because it is empty.`);
//       }
//     }
//   }

//   public broadcast(roomId: string, message: string, senderWs: WebSocket): void {
//     const room = this.rooms[roomId];
//     if (room) {
//       room.forEach((ws) => {
//         if (ws !== senderWs) {
//           // Optionally skip sending the message back to the sender
//           ws.send(JSON.stringify({ event: 'message', roomId, message }));
//         }
//       });
//     }
//   }

//   public getRoomSize(roomId: string): number {
//     return this.rooms[roomId]?.size || 0;
//   }

//   public isRoomExists(roomId: string): boolean {
//     return !!this.rooms[roomId];
//   }
// }

// export const Room = new RoomManager();
