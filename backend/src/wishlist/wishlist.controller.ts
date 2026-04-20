import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getUserWishlist(@Request() req: any) {
    return this.wishlistService.getUserWishlist(req.user.id);
  }

  @Post(':productId')
  toggleWishlist(@Request() req: any, @Param('productId') productId: string) {
    return this.wishlistService.toggleWishlist(req.user.id, productId);
  }
}
