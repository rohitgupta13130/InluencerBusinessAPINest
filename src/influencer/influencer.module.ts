import { Module } from '@nestjs/common';
import { InfluencerController } from './influencer.controller';
import { InfluencerService } from './influencer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { Influencer, InfluencerSchema } from '../schemas/influencer.schema';


@Module({
  imports:[MongooseModule.forFeature([{name : Influencer.name, schema:InfluencerSchema}])],
  controllers: [InfluencerController],
  providers: [InfluencerService]
})
export class InfluencerModule {}
