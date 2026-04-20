import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, OrderStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async processPayment(orderId: string, amount: number, provider: string, transactionId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    
    // Simulate payment logic and create payment record
    const payment = await this.prisma.payment.create({
      data: {
        orderId,
        amount,
        status: PaymentStatus.COMPLETED,
        provider,
        transactionId,
      },
    });

    // Update order status
    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.PAID },
    });

    return payment;
  }

  async processCOD(orderId: string, amount: number) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const payment = await this.prisma.payment.create({
      data: {
        orderId,
        amount,
        status: PaymentStatus.PENDING,
        provider: 'COD',
      },
    });

    return payment;
  }
}
