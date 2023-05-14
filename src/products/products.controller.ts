import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //Res,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';
import { PutProductDto } from './dto/put-product.dto';
// import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    //   findAll(@Res() response: Response) {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: PatchProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  patchProduct(
    @Param('id') id: string,
    @Body() updateProductDto: PutProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
