import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import documentRoutes from './routes/documentRoutes.js';
import { initSocket } from './sockets/documentSocket.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/documents', documentRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('API Running');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // tighten this to your frontend URL later
    methods: ['GET', 'POST'],
  },
});

initSocket(io);

server.listen(process.env.PORT, () => {
  console.log('Server is running');
});