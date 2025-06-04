import http from 'http';
import app from './index.js';
import { initializeSocket } from './socket.js';

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});