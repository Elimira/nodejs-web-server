// import indexList from './mongoIndexes';
import { Db, ObjectID } from 'mongodb';
import { InjectConnection } from '../mongo/index';
import { Injectable, Logger } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { IGetApiResponse } from '../publisher/interfaces';
import { CreateDataDto } from 'src/publisher/types';

@Injectable()
export class StoreService {
  logger = new Logger();
  constructor(@InjectConnection() private readonly mongoConnection: Db) {}

  async addPayload({
    ts,
    sender,
    message,
    sent_from_ip,
    priority,
  }: CreateDataDto): Promise<boolean> {
    try {
      await this.mongoConnection.collection('data').insertOne({
        ts,
        sender,
        message,
        sent_from_ip,
        priority,
      });
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getAllPayloads(): Promise<IGetApiResponse> {
    try {
      const payloads = await this.mongoConnection
        .collection('data')
        .find({})
        .sort({ priority: 1 })
        .toArray();
      return { status: HttpStatus.ACCEPTED, res: payloads };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPayloadById(id: ObjectID): Promise<IGetApiResponse> {
    this.logger.log('in me');
    this.logger.log(id);
    try {
      const payload = await this.mongoConnection
        .collection('data')
        .findOne({ _id: id });
      return { status: 200, res: [payload] };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error: string): IGetApiResponse {
    this.logger.error(error);
    switch (error) {
      case 'Error: Invalid input data':
        return { status: HttpStatus.BAD_REQUEST, res: error };
      default:
        return { status: HttpStatus.SERVICE_UNAVAILABLE, res: error };
    }
  }
}
