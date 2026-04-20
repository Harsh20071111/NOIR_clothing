import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: { images: true, variants: true, category: true },
    });
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { images: true, variants: true, category: true, reviews: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: any) {
    return this.prisma.product.create({ data });
  }
}
