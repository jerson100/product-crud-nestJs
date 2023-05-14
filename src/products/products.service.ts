import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PutProductDto, CreateProductDto, PatchProductDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  //   private readonly products: Product[] = [];

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const currentProduct = await this.productModel.findOne({
      name: createProductDto.name,
    });
    if (currentProduct)
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);

    const newProduct = new this.productModel(createProductDto);
    await newProduct.save();
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const p = await this.productModel.findOne({
      _id: id,
    });
    if (!p) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return p;
  }

  async update(
    id: string,
    updateProductDto: PatchProductDto | PutProductDto,
  ): Promise<Product> {
    const existsProduct = await this.productModel.findOne({ _id: id });
    if (!existsProduct)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    const existsProductName = await this.productModel.findOne({
      name: updateProductDto.name,
    });
    if (existsProductName && existsProductName._id.toString() !== id) {
      throw new HttpException(
        'Product name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateProductDto },
      { new: true },
    );
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productModel.findOneAndDelete({ _id: id });
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
