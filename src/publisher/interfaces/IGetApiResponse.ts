import { Status } from '../types';
import { IData } from './IData';

export interface IGetApiResponse {
  res: Array<IData> | String;
  status: Status;
}
