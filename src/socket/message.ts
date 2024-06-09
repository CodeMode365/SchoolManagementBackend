import type { WebSocket } from 'ws';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMessage = (ws: WebSocket, data: any) => {
  ws.send(JSON.stringify(data));
};
