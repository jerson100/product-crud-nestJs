import {
  IsString,
  Length,
  IsEmail,
  Matches,
  Equals,
  ValidateIf,
} from 'class-validator';

export class PatchUserDto {
  @Length(3, 50, {
    message:
      'Name must be at least 3 characters long and at most 50 characters long',
  })
  @IsString({
    message: 'Name must be a string',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email must be a valid email',
    },
  )
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number',
  })
  @IsString({
    message: 'Password must be a string',
  })
  password: string;

  @Equals('password', { message: 'Passwords do not match' })
  @IsString({
    message: 'Password confirmation must be a string',
  })
  @ValidateIf((o) => o.password !== undefined)
  confirmPassword: string;
}
