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

// Build a list of explicitly allowed origins (trailing slashes stripped)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ''));
}

// Dynamic checker — handles trailing-slash mismatches and all *.vercel.app previews
const checkOrigin = (
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void
) => {
  if (!origin) return callback(null, true); // allow server-to-server / curl
  const clean = origin.replace(/\/$/, '');
  const ok =
    allowedOrigins.includes(clean) ||
    clean.endsWith('.vercel.app') ||
    /^https?:\/\/localhost(:\d+)?$/.test(clean);
  ok ? callback(null, true) : callback(new Error('Not allowed by CORS'));
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

app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
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
