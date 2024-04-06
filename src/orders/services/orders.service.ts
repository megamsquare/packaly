import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, PackagesDto } from '../dto/create-order.dto';
import { UpdateStatusDto } from '../dto/update-order.dto';
import { Order } from '../interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    if (!createOrderDto.packages || createOrderDto.packages.length === 0) {
      throw new BadRequestException('At least one package is required.');
    }

    if (
      createOrderDto.dropoff.zipcode.replace(/\s+/g, '').length !== 6 ||
      createOrderDto.pickup.zipcode.replace(/\s+/g, '').length !== 6
    ) {
      throw new BadRequestException('Zipcode must be 6 characters long.');
    }

    const order = new this.orderModel(createOrderDto);
    order.price = await this.calculatePrice(order.packages);
    order.status = 'CREATED';
    const savedOrder = await order.save();
    return {
      order_id: savedOrder._id,
      status: savedOrder.status,
      price: savedOrder.price,
    };
  }

  async updateStatus(id: string, updateStatusDto: UpdateStatusDto) {
    const { status } = updateStatusDto;
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order does not exit');
    }

    const oldStatus = order.status;

    const checkStatus = await this.stateMachine(oldStatus, status);

    if (!checkStatus) {
      throw new BadRequestException(`Order can not be ${status}`); // Invalid status transition
    }

    order.status = status;
    const updatedOrder = await order.save();
    return {
      order_id: updatedOrder._id,
      new_status: updatedOrder.status,
      old_status: oldStatus,
    };
  }

  async findByDropoffAddress(address: string, zipcode: string) {
    return this.orderModel
      .find({
        'dropoff.address': new RegExp(address, 'i'),
        'dropoff.zipcode': zipcode,
      })
      .exec();
  }

  async calculatePrice(packages: PackagesDto[]): Promise<number> {
    // Initialize price
    let price = 0;

    // Add base price for each package
    price += packages.length;

    // Calculate total volume and weight
    let totalVolume = 0;
    let totalWeight = 0;
    for (const pkg of packages) {
      totalVolume += pkg.height * pkg.length * pkg.width;
      totalWeight += pkg.weight;
    }

    // Calculate additional charges based on volume
    const volumeTiers = Math.floor(totalVolume / 5000);
    price += volumeTiers * 0.5;

    // Calculate additional charges based on weight
    price += totalWeight * 0.1;

    return price;
  }

  async stateMachine(orderStatus: string, newStatus: string): Promise<boolean> {
    if (
      (orderStatus === 'CREATED' &&
        newStatus !== 'PICKED_UP' &&
        newStatus !== 'CANCELLED') ||
      (orderStatus === 'PICKED_UP' &&
        newStatus !== 'DELIVERED' &&
        newStatus !== 'RETURNING') ||
      (orderStatus === 'RETURNING' && newStatus !== 'RETURNED') ||
      orderStatus === 'CANCELLED' ||
      orderStatus === 'DELIVERED' ||
      orderStatus === 'RETURNED'
    ) {
      return false;
    }

    return true;
  }
}
