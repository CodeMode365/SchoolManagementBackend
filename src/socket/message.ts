import type { WebSocket } from 'ws';

export const handleMessage = (ws: WebSocket, data: any) => {
  ws.send(JSON.stringify(data));
};
