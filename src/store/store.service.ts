//import indexList from './mongoIndexes';
import { Db, ObjectID } from 'mongodb';
import { InjectConnection } from '../mongo/index';
import { Injectable, Logger } from '@nestjs/common';
import { CreateDataDto, Status } from '../publisher/types';
import { IGetApiResponse } from '../publisher/interfaces';

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
        ts: ts,
        sender: sender,
        message: message,
        sent_from_ip: sent_from_ip,
        priority: priority,
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
      return { status: Status.Successful, res: payloads };
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
        return { status: Status.BadRequest, res: error };
      default:
        return { status: Status.ServerUnavailable, res: error };
    }
  }
}
