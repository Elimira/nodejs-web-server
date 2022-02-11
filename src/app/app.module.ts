import config from '../config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { MongoModule } from '../mongo/mongo.module';
import { PublisherController } from '../publisher/publish.controller';
import { ConsumerController } from '../consumer/consumer.controller';
import { StoreService } from '../store/store.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerModule } from 'src/consumer/consumer.module';

const queueName = config.microserviceOptions.queueName;
const host = config.microserviceOptions.host;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsumerModule,
    MongoModule.forRoot(config.mongo),
    ClientsModule.register([
      {
        name: 'PUBLISH_PAYLOAD',
        transport: Transport.RMQ,
        options: {
          urls: [host],
          queue: queueName,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, PublisherController, ConsumerController],
  providers: [StoreService],
})
export class AppModule {}
