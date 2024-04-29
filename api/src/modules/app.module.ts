import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from 'src/modules/task/task.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL!, {
      dbName: process.env.DATABASE_NAME,
      auth: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
