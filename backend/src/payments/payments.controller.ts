import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':orderId/process')
  processPayment(
    @Param('orderId') orderId: string,
    @Body() data: { amount: number; provider: string; transactionId: string }
  ) {
    return this.paymentsService.processPayment(orderId, data.amount, data.provider, data.transactionId);
  }

  @Post(':orderId/cod')
  processCOD(
    @Param('orderId') orderId: string,
    @Body() data: { amount: number }
  ) {
    return this.paymentsService.processCOD(orderId, data.amount);
  }
}
