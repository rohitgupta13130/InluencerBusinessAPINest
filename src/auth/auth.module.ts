import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {MongooseModule} from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { InfluencerModule } from 'src/influencer/influencer.module';
import { Influencer, InfluencerSchema } from 'src/schemas/influencer.schema';

@Module({
    imports: [
      InfluencerModule,
      PassportModule,
    JwtModule.register({
      secret: 'mySecretKey123',   // 🔑 keep safe (use env in real apps)
      signOptions: { expiresIn: '1h' },
    }),
    InfluencerModule,
    MongooseModule.forFeature([{name: Influencer.name, schema: InfluencerSchema}]),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
   exports: [AuthService],
})
export class AuthModule {}
