import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async toggleWishlist(userId: string, productId: string) {
    const existing = await this.prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      await this.prisma.wishlist.delete({ where: { id: existing.id } });
      return { message: 'Removed from wishlist', status: 'removed' };
    }

    await this.prisma.wishlist.create({ data: { userId, productId } });
    return { message: 'Added to wishlist', status: 'added' };
  }

  async getUserWishlist(userId: string) {
    return this.prisma.wishlist.findMany({
      where: { userId },
      include: { product: { include: { images: true } } },
    });
  }
}
