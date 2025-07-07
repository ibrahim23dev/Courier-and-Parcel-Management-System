import mongoose from 'mongoose';
import { server } from './app';
import { config } from './config';

async function bootstrap() {
  await mongoose.connect(config.mongoUri);
  server.listen(parseInt(String(config.port), 10), () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

bootstrap();