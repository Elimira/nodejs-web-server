import config from '../config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { PublisherController } from '../publisher/publish.controller';
import { ConsumerController } from '../consumer/consumer.controller';
import { StoreService } from '../store/store.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerModule } from 'src/consumer/consumer.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { PayloadResolver } from 'src/gql/gql.resolver';

const queueName = config.microserviceOptions.queueName;
const host = config.microserviceOptions.host;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>(config.graphql),
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
  controllers: [PublisherController, ConsumerController],
  providers: [StoreService, PayloadResolver],
})
export class AppModule {}
