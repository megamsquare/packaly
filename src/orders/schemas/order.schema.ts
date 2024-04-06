// import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ _id: false })
export class Dropoff {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  zipcode: string;

  @Prop({ required: true })
  phonenumber: string;
}

@Schema({ _id: false })
export class Pickup {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  zipcode: string;

  @Prop({ required: true })
  phonenumber: string;
}

@Schema({ _id: false })
export class Packages {
  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  weight: number;
}

@Schema({ collection: 'orders', timestamps: true })
export class Order {
  @Prop({ type: Dropoff })
  dropoff: Dropoff;

  @Prop({ type: Pickup })
  pickup: Pickup;

  @Prop({ type: [Packages] })
  packages: Packages[];

  @Prop()
  status: string;

  @Prop()
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
