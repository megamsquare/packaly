import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
} from 'class-validator';

class DropoffDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  phonenumber: string;
}

class PickupDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @ApiProperty({})
  @IsString()
  @Length(6)
  zipcode: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PackagesDto {
  @ApiProperty({})
  @IsNumber()
  height: number;

  @ApiProperty({})
  @IsNumber()
  length: number;

  @ApiProperty({})
  @IsNumber()
  width: number;

  @ApiProperty({})
  @IsNumber()
  weight: number;
}

export class CreateOrderDto {
  @ApiProperty({})
  @IsObject()
  @IsNotEmpty()
  dropoff: DropoffDto;

  @ApiProperty({})
  @IsObject()
  @IsNotEmpty()
  pickup: PickupDto;

  @ApiProperty({})
  @IsArray()
  @IsNotEmpty()
  packages: PackagesDto[];
}
