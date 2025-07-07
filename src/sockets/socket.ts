import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export function initSocket(io: Server) {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const payload = jwt.verify(token, config.jwtSecret) as any;
      (socket as any).user = payload;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: Socket) => {
    socket.on('joinParcel', (parcelId: string) => {
      socket.join(`parcel_${parcelId}`);
    });

    socket.on('locationUpdate', ({ parcelId, coords }: { parcelId: string; coords: [number, number] }) => {
      io.to(`parcel_${parcelId}`).emit('locationUpdate', coords);
    });
  });
}