import type { WebSocket } from 'ws';
// import { Room } from '@/config/socket';

export const handleMessage = (ws: WebSocket, data: string) => {
  console.log(ws.roomId);
  // try {
  //   const message = JSON.parse(data);
  //   const { event, payload } = message;

  //   if (!event || !payload) {
  //     throw new Error('Invalid message format');
  //   }

  //   switch (event) {
  //     case 'join_room':
  //       handleJoinRoom(ws, payload);
  //       break;
  //     case 'leave_room':
  //       handleLeaveRoom(ws, payload);
  //       break;
  //     case 'message':
  //       handleMessageEvent(ws, payload);
  //       break;
  //     default:
  //       console.warn(`Unhandled event: ${event}`);
  //       break;
  //   }
  // } catch (error) {
  //   console.error('Error handling message:', error);
  //   ws.send(JSON.stringify({ event: 'error', message: error.message }));
  // }
};

// const handleJoinRoom = (ws: WebSocket, payload: { roomId: string }) => {
//   const { roomId } = payload;
//   if (!roomId) {
//     ws.send(
//       JSON.stringify({
//         event: 'error',
//         message: 'roomId is required to join a room',
//       })
//     );
//     return;
//   }
//   Room.join(roomId, ws);
//   ws.send(JSON.stringify({ event: 'joined_room', roomId }));
// };

// const handleLeaveRoom = (ws: WebSocket, payload: { roomId: string }) => {
//   const { roomId } = payload;
//   if (!roomId) {
//     ws.send(
//       JSON.stringify({
//         event: 'error',
//         message: 'roomId is required to leave a room',
//       })
//     );
//     return;
//   }
//   Room.leave(roomId, ws);
//   ws.send(JSON.stringify({ event: 'left_room', roomId }));
// };

// const handleMessageEvent = (
//   ws: WebSocket,
//   payload: { roomId: string; message: string }
// ) => {
//   const { roomId, message } = payload;
//   if (!roomId || !message) {
//     ws.send(
//       JSON.stringify({
//         event: 'error',
//         message: 'roomId and message are required to send a message',
//       })
//     );
//     return;
//   }
//   Room.broadcast(roomId, message, ws);
//   ws.send(JSON.stringify({ event: 'message_sent', roomId, message }));
// };
