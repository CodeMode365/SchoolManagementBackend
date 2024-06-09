import { WebSocket } from 'ws';
import { socket } from '@/config';

import { handleMessage } from './message';
import { handleNotification } from './notification';

export const SocketChannelSetup = () => {
  const wss = socket.getWsInstance();

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
      try {
        const { channel, data } = JSON.parse(message);

        switch (channel) {
          case 'message':
            handleMessage(ws, data);
            break;
          case 'notification':
            handleNotification(ws, data);
            break;
          default:
            ws.send(
              JSON.stringify({
                error: 'Invalid channel',
              })
            );
            break;
        }
        // eslint-disable-next-line @typescript-eslint/disable-next-line
      } catch (error: any) {
        throw new Error(error);
      }
    });
  });
};
