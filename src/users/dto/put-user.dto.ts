import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  Matches,
  Equals,
} from 'class-validator';

export class PutUserDto {
  @Length(3, 50, {
    message:
      'Name must be at least 3 characters long and at most 50 characters long',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email must be a valid email',
    },
  )
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number',
  })
  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;

  @Equals('password', { message: 'Passwords do not match' })
  @IsString({
    message: 'Password confirmation must be a string',
  })
  @IsNotEmpty({
    message: 'Password confirmation is required',
  })
  confirmPassword: string;
}
