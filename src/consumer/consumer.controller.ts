import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { StoreService } from 'src/store/store.service';
import { CreateDataDto } from '../publisher/types/index';

@Controller()
export class ConsumerController {
  constructor(private readonly storeService: StoreService) {}
  logger = new Logger();

  @EventPattern('PUBLISH_PAYLOAD')
  async ConsumePayload(createDataDto: CreateDataDto): Promise<boolean> {
    this.logger.log(
      `Consumer has received message: ${JSON.stringify(createDataDto)}`,
    );
    return await this.storeService.addPayload(createDataDto);
  }
}
