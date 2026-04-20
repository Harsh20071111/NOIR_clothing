import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { variant: { include: { product: { include: { images: true } } } } },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { variant: { include: { product: true } } } } },
      });
    }

    return cart;
  }

  async addItem(userId: string, variantId: string, quantity: number) {
    const cart = await this.getCart(userId);
    
    const existingItem = await this.prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId: cart.id, variantId } },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: { cartId: cart.id, variantId, quantity },
    });
  }

  async removeItem(cartItemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
