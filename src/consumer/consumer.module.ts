import { Module } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { ConsumerController } from './consumer.controller';

@Module({
  imports: [],
  controllers: [ConsumerController],
  providers: [StoreService],
})
export class ConsumerModule {}
