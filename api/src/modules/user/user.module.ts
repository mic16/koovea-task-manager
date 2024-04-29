import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller';
import { UserAuthService } from 'src/modules/user/services/user.auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class UserModule {}
