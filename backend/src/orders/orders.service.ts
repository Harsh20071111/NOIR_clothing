import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, data: any) {
    const { items, paymentMethod, totalAmount } = data;
    
    // Transactional stock deduction & order creation
    return this.prisma.$transaction(async (tx) => {
      // 1. Validate stock
      for (const item of items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
        });
        if (!variant || variant.stock < item.quantity) {
          throw new BadRequestException(`Insufficient stock for variant ${item.variantId}`);
        }
      }

      // 2. Deduct stock
      for (const item of items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // 3. Create order
      return tx.order.create({
        data: {
          userId,
          paymentMethod,
          totalAmount,
          items: {
            create: items.map((i: any) => ({
              variantId: i.variantId,
              quantity: i.quantity,
              priceAtTime: i.priceAtTime,
            })),
          },
        },
        include: { items: true },
      });
    });
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { variant: { include: { product: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
