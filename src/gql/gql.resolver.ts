import { Inject, Logger, ParseIntPipe, UseGuards, UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { StoreService } from 'src/store/store.service';
import { ObjectID } from 'mongodb';
import { IGetApiResponse } from 'src/publisher/interfaces';
import { CreateDataDto, CustomValidationPipe } from 'src/publisher/types';
import { PayloadsGuard } from './payloads.guard';

@Resolver()
@UseGuards(PayloadsGuard)
export class PayloadResolver {
  constructor(
    private readonly storeService: StoreService,
    @Inject('PUBLISH_PAYLOAD') private client: ClientProxy,
  ) {}

  logger = new Logger();

  @Query('payloads')
  async getPayloads() {
    return await this.storeService.getAllPayloads();
  }

  @Query('payload')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<IGetApiResponse> {
    return await this.storeService.getPayloadById(new ObjectID(id));
  }

  @Mutation('createPayload')
  @UsePipes(CustomValidationPipe)
  async createPayload(
    @Args('createPayloadInput') args: CreateDataDto,
  ): Promise<boolean> {
    this.logger.log(`ars are4 ---> ${JSON.stringify(args)}`)
    this.client.emit<number>('PUBLISH_PAYLOAD', args);
    return true;
    // TODO: use @subscription
  }
}
