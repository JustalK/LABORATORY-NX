import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE1',
        transport: Transport.TCP,
        options: {
            port: 3001,
        }
      },
      {
        name: 'MICROSERVICE2',
        transport: Transport.TCP,
        options: {
            port: 3002,
        }
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
