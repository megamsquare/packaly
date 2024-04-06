import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
} from 'class-validator';

class DropoffDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  phonenumber: string;
}

class PickupDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @Length(6)
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PackagesDto {
  @IsNumber()
  height: number;

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  weight: number;
}

export class CreateOrderDto {
  @IsObject()
  @IsNotEmpty()
  dropoff: DropoffDto;

  @IsObject()
  @IsNotEmpty()
  pickup: PickupDto;

  @IsArray()
  @IsNotEmpty()
  packages: PackagesDto[];
}
