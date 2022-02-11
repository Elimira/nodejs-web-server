import { IMongoModuleOptions } from './mongo/index';
import { DocumentBuilder } from '@nestjs/swagger';
import IMicroserviceOptions from './app/type/IMicroserviceOptions';
import 'dotenv/config';

const appKey = process.env.APP_KEY || 'some-random-string';
const serverAddress = process.env.SERVER_ADDRESS || 'http://localhost:3333';

const config: IConfig = {
  app: {
    port: process.env.PORT || 3333,
    url: serverAddress,
    key: appKey,
  },
  mongo: {
    name: process.env.MONGO_DB_NAME || 'Project',
    host: process.env.MONGO_HOST || 'localhost:27017',
  },
  openAPIObject: new DocumentBuilder()
    .setTitle('Assignment')
    .setDescription('The Web Service API descriptions')
    .setVersion('1.0')
    .addTag('The Org ♥')
    .build(),
  microserviceOptions: {
    user: process.env.user || 'guest',
    password: process.env.APP_KEY || 'guest',
    host: process.env.host || 'amqp://localhost:5672',
    queueName: process.env.queueName || 'persist_web_payload',
  },
};

export default config;
interface IConfig {
  app: any;
  mongo: IMongoModuleOptions;
  openAPIObject: any;
  microserviceOptions: IMicroserviceOptions;
}
