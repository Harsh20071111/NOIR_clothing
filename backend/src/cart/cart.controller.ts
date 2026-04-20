import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('add')
  addItem(@Request() req: any, @Body() data: { variantId: string; quantity: number }) {
    return this.cartService.addItem(req.user.id, data.variantId, data.quantity);
  }

  @Delete(':itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.cartService.removeItem(itemId);
  }
}
