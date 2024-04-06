import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateStatusDto } from '../dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findByDropoffAddress(
    @Query('address') address: string,
    @Query('zipcode') zipcode: string,
  ) {
    return this.ordersService.findByDropoffAddress(address, zipcode);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateStatusDto);
  }
}
