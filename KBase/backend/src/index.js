import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

import articlesRouter from './routes/articles.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);

app.use('/api/articles', articlesRouter);

io.on('connection', (socket) => {
  console.log('client', socket.id, 'connected');
  const beat = setInterval(() => socket.emit('heartbeat', Date.now()), 10_000);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Backend + WS running on :${PORT}`));