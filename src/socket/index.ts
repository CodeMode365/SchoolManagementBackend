import { socket } from '@/config';
import type { UserSchemaType } from '@/types/model';
import type { Socket as SocketType } from 'socket.io';

const activeUsers: Record<string, UserSchemaType> = {};

export const SocketChannelSetup = () => {
  const io = socket.getIoInstance();

  io.on('connection', (socket: SocketType) => {
    socket.on('setup', (user: UserSchemaType) => {
      activeUsers[socket.id] = user;
      socket.join(user._id as string);
      socket.emit('connected');

      io.emit(
        'active-users',
        Object.values(activeUsers).map((obj) => obj._id)
      );
    });

    socket.on('join', (roomId: string) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on(
      'private-message',
      (data: { sender: string; receiver: string; content: string }) => {
        const { sender, receiver, content } = data;
        socket.in(receiver).emit('message', { sender, receiver, content });
      }
    );

    socket.on('public-message', (data) => {
      const { users, message } = data;
      if (!users) return;

      users.forEach((user: { _id: string }) => {
        socket.to(user._id).emit('message', message);
      });
    });

    socket.on(
      'typing',
      (data: { sender: string; receiver: string; isTyping: boolean }) => {
        const { receiver, isTyping, sender } = data;
        console.log(data);
        socket.to(receiver).emit('typing-status', {
          sender,
          receiver,
          isTyping: isTyping,
        });
      }
    );

    socket.on('leave-channel', (channelId: string) => {
      socket.leave(channelId);
      console.log(`User left channel: ${channelId}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);

      delete activeUsers[socket.id];

      socket.broadcast.emit(
        'active-users',
        Object.values(activeUsers).map((obj) => obj._id)
      );
    });
  });
};
