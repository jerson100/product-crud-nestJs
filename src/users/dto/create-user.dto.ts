import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  Matches,
  IsDefined,
} from 'class-validator';
import { Match, Trim } from 'src/decorators';
export class CreateUserDto {
  @Length(3, 50, {
    message:
      'Name must be at least 3 characters long and at most 50 characters long',
  })
  @IsNotEmpty({
    message: "Name isn't empty",
  })
  @IsString({
    message: 'Name must be a string',
  })
  @IsDefined({
    message: 'Name is required',
  })
  @Trim()
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email must be a valid email',
    },
  )
  @IsNotEmpty({
    message: "Email isn't empty",
  })
  @IsString({
    message: 'Email must be a string',
  })
  @IsDefined({
    message: 'Email is required',
  })
  @Trim()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number',
  })
  @IsNotEmpty({
    message: "Password isn't empty",
  })
  @IsString({
    message: 'Password must be a string',
  })
  @IsDefined({
    message: 'Password is required',
  })
  password: string;

  @Match('password', {
    message: 'Passwords do not match',
  })
  @IsNotEmpty({
    message: "Password confirmation isn't empty",
  })
  @IsString({
    message: 'Password confirmation must be a string',
  })
  @IsDefined({
    message: 'Password confirmation is required',
  })
  @Trim()
  confirmPassword: string;
}
