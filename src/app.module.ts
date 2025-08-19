import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluencerModule } from './influencer/influencer.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
     MongooseModule.forRoot('mongodb://127.0.0.1:27017/InfluencerApp'),
    InfluencerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
