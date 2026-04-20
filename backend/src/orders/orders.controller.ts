import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Request() req: any, @Body() data: any) {
    return this.ordersService.createOrder(req.user.id, data);
  }

  @Get()
  getUserOrders(@Request() req: any) {
    return this.ordersService.getUserOrders(req.user.id);
  }
}
