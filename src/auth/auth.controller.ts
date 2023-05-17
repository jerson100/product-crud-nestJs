import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignin } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  signin(@Body() auth: AuthSignin) {
    return this.authService.signIn(auth);
  }
}
