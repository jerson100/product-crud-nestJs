import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export default class UserResponse extends OmitType(CreateUserDto, [
  'password',
]) {}
