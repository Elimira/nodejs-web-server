import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';
import { StoreService } from 'src/store/store.service';
import { PayloadResolver } from './gql.resolver';

const queueName = config.microserviceOptions.queueName;
const host = config.microserviceOptions.host;

@Module({
  providers: [PayloadResolver, StoreService],
  imports: [
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

})
export class GqlModule {}
