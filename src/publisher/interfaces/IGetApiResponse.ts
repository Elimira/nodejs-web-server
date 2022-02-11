import { Status } from '../types';
import { IData } from './IData';

export interface IGetApiResponse {
  res: IData[] | string;
  status: Status;
}
