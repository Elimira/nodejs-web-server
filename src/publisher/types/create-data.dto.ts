import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsIP,
  IsDefined,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class Message {
  @ApiProperty()
  @IsString()
  @IsOptional()
  foo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  baz: string;
}

export class CreateDataDto {
  @ApiProperty()
  @IsNotEmpty()
  ts: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty({ type: () => Message })
  @IsDefined()
  @ValidateNested()
  @Type(() => Message)
  message: Message;

  @ApiProperty()
  @IsOptional()
  @IsIP()
  sent_from_ip: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  priority: number;
}
