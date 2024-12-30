import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  async findOneBy(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    return product;
  }

  create(productData: Partial<Product>) {
    const product = this.productRepository.create(productData);
    product.createdAt = new Date();
    product.updatedAt = new Date();
    return this.productRepository.save(product);
  }

  async update(id: number, productData: Partial<Product>) {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    await this.productRepository.delete(id);
    return product;
  }
}
