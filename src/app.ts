import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { AuthRouter } from './routers/AuthRouter';
import { CustomerRouter } from './routers/CustomerRouter';
import { AgentRouter } from './routers/AgentRouter';
import { AdminRouter } from './routers/AdminRouter';
import { initSocket } from './sockets/socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const routers = [new AuthRouter(), new CustomerRouter(), new AgentRouter(), new AdminRouter()];
routers.forEach(r => app.use('/api', r.router));

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Initialize WebSocket
initSocket(io);

export { server, app };