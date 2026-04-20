import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async addReview(userId: string, productId: string, data: any) {
    return this.prisma.review.upsert({
      where: { userId_productId: { userId, productId } },
      update: { rating: data.rating, comment: data.comment },
      create: { userId, productId, rating: data.rating, comment: data.comment },
    });
  }

  async getProductReviews(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      include: { user: { select: { firstName: true, lastName: true } } },
    });
  }
}
