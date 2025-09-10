import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';
import { Influencer, InfluencerDocument } from '../schemas/influencer.schema';


@Injectable()
export class InfluencerService {

    constructor(
         @InjectModel(Influencer.name) private infuencerModel: Model<InfluencerDocument>,
    ){}

    async findAll(): Promise<Influencer[]> {
    return this.infuencerModel.find().exec();
  }

   async create(influencer: Influencer): Promise<Influencer> {
    const created = new this.infuencerModel(influencer);
    console.log('Service has been hit')
    return created.save();
  }

}


