import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOneBy(id);
  }

  @Post()
  create(@Body() productData: any) {
    return this.productsService.create(productData);
  }

  @Patch(':id')
  async update(@Body() productData: any, @Param('id') id: number) {
    return await this.productsService.update(id, productData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
