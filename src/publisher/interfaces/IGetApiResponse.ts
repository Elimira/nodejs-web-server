import { HttpStatus } from '@nestjs/common';
import { IData } from './IData';

export interface IGetApiResponse {
  res: IData[] | string;
  status: HttpStatus;
}
