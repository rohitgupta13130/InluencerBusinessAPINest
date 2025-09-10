import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from '../schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
      UsersModule,
      PassportModule,
    JwtModule.register({
      secret: 'mySecretKey123',   // 🔑 keep safe (use env in real apps)
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
   exports: [AuthService],
})
export class AuthModule {}
