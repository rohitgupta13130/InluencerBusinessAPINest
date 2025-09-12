import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluencerModule } from './influencer/influencer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GuidController } from './guid/guid.controller';
import { GuidModule } from './guid/guid.module';



@Module({
  imports: [
     MongooseModule.forRoot('mongodb://127.0.0.1:27017/InfluencerApp'),
    InfluencerModule,
    AuthModule,
    GuidModule],
  controllers: [AppController, GuidController],
  providers: [AppService],
})
export class AppModule {}
