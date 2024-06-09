import type { WebSocket } from 'ws';

export const handleNotification = (ws: WebSocket, data: any) => {
  ws.send('HEllo from notification channel');
};
