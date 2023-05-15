import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, PatchUserDto, PutUserDto } from './dto';
import {
  RemovePasswordInterceptor,
  RemoveStatusInterceptor,
} from 'src/interceptors';
import { ValidateMongoIdPipe } from 'src/pipes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(RemovePasswordInterceptor, RemoveStatusInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(RemovePasswordInterceptor, RemoveStatusInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(RemovePasswordInterceptor, RemoveStatusInterceptor)
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(RemovePasswordInterceptor, RemoveStatusInterceptor)
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateUserDto: PutUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  @UseInterceptors(RemovePasswordInterceptor, RemoveStatusInterceptor)
  patch(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateUserDto: PatchUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(RemovePasswordInterceptor, RemoveStatusInterceptor)
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
