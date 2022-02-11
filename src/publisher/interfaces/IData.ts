import { ObjectID } from 'mongodb';

export interface IData {
  _id: ObjectID;
  ts: string;
  sender: string;
  message: IMessage;
  sentFromIp: string;
  priority: number;
}

export interface IMessage {
  foo: string;
  baz: string;
}
