import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ParcelModule } from './parcel/parcel.module';
import { AgentModule } from './agent/agent.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SocketModule } from './socket/socket.module';
import { databaseConfig } from './config/database.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.mongoUri),
    RedisModule.forRoot({
      config: redisConfig,
    }),
    AuthModule,
    ParcelModule,
    AgentModule,
    AnalyticsModule,
    SocketModule,
  ],
})
export class AppModule {}