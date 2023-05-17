import {
  IsDefined,
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Trim } from 'src/decorators';

export class AuthSignin {
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
  @Trim()
  @IsDefined({
    message: 'Email is required',
  })
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
}
