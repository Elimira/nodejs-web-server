import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as IpAddress from 'ip-address';
import { CreateDataDto, Message } from '.';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: CreateDataDto, metaData: ArgumentMetadata) {
    const { metatype } = metaData;

    if (this.isInvalidDate(value.ts)) {
      throw new HttpException(
        `validation failed, Invalid timestamp`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (value?.sent_from_ip) {
      if (this.isNotIpV4(value.sent_from_ip)) {
        throw new HttpException(
          `validation failed, Invalid IPv4 address`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (this.isEmpty(value)) {
      throw new HttpException(
        `validation failed, no payload provided`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.isEmptyMessage(value.message)) {
      throw new HttpException(
        `validation failed, message should have at least one field`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const object = plainToClass(metatype, value);
    await Validate(object);
    return value;
  }

  private isEmpty(value: CreateDataDto) {
    if (Object.keys(value).length < 1) {
      return true;
    }
    return false;
  }

  private isEmptyMessage(message: Message) {
    if (Object.keys(message).length < 1) {
      return true;
    }
    return false;
  }

  private isInvalidDate(timestamp: string) {
    return new Date(timestamp).getTime() < 0;
  }

  private isNotIpV4(ip: any) {
    const ipv4 = IpAddress.Address4;
    try {
      const address = new ipv4(ip);
      return false;
    } catch (error) {
      return true;
    }
  }
}
