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
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto, PatchProductDto, PutProductDto } from './dto';
import { ProductsService } from './products.service';
import { ValidateMongoIdPipe } from 'src/pipes';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
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
  findOne(
    @Param('id', ValidateMongoIdPipe)
    id: String,
  ) {
    return this.productsService.findOne(id.toString());
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateProductDto: PatchProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  patchProduct(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateProductDto: PutProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
