import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db';
import './config/redis';
import worker, { setSocketIO } from './workers/generationWorker';
import router from './routes/assignmentRoutes';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
];

if (process.env.FRONTEND_URL) {
  const cleanUrl = process.env.FRONTEND_URL.replace(/\/$/, '');
  allowedOrigins.push(cleanUrl);
}

const checkOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  if (!origin) {
    return callback(null, true);
  }
  const cleanOrigin = origin.replace(/\/$/, '');
  const isAllowed = allowedOrigins.includes(cleanOrigin) || 
                    cleanOrigin.endsWith('.vercel.app') || 
                    /^https?:\/\/localhost(:\d+)?$/.test(cleanOrigin);

  if (isAllowed) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors({
  origin: checkOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api', router);
console.log('Routes registered');

const io = new Server(httpServer, {
  cors: {
    origin: checkOrigin,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Pass the socket.io instance to the worker (avoids circular imports)
setSocketIO(io);
console.log('Worker initialized and listening for jobs');

app.get('/', (req, res) => {
  res.send('API is running');
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join-job', (jobId: string) => {
    socket.join(jobId);
    console.log(`Client ${socket.id} joined room: ${jobId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
