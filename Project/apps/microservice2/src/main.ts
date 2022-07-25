/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002
      }
    },
  );
  await app.listen();
}

bootstrap();
