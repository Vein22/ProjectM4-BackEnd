import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  
  @ApiTags('Orders')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.addOrder(createOrderDto);
  }

  @ApiTags('Orders')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrder(id);
  }
}