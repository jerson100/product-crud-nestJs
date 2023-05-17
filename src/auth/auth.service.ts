import { HttpException, Injectable, Inject } from '@nestjs/common';
import { AuthSignin } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { UserStatus } from 'src/users/user.consts';
import { comparePassword } from 'src/utils/bycript.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') readonly userModel: Model<User>,
  ) {}

  async signIn(auth: AuthSignin) {
    const { email, password } = auth;
    const p = await this.userModel.findOne({
      email,
      status: {
        $ne: UserStatus.DELETED,
      },
    });
    if (!p) throw new HttpException('Email or password incorrect', 401);
    if (p.status !== UserStatus.ACTIVE) {
      let msg =
        p.status === UserStatus.LOCKED
          ? 'The user account was locked, contact the administrator'
          : 'Email or password incorrect';
      throw new HttpException(msg, 401);
    }
    const isMatch = await comparePassword(password, p.password);
    if (!isMatch) throw new HttpException('Email or password incorrect', 401);
    const payload = {
      id: p._id,
      email: p.email,
      role: p.role,
      image: p.image,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
