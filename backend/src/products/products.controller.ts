import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any) {
    return this.productsService.create(data);
  }
}
