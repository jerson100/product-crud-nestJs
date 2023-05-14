import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles, UserStatus } from '../user.consts';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({
    index: {
      unique: true,
    },
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: UserRoles.USER,
  })
  role: string;

  @Prop()
  image: string;

  @Prop({
    default: UserStatus.ACTIVE,
  })
  status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
