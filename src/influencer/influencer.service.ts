import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';
import { Influencer, InfluencerDocument } from '../schemas/influencer.schema';
import { InfluencerRegistrationDto } from '../dtos/influencer-registration.dto';
import * as bcrypt from 'bcrypt';


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

    async register(dto: InfluencerRegistrationDto): Promise<Influencer> {
    // hash password before saving
    const hashedPassword = await bcrypt.hash(dto.passwordHash, 10);

    const newInfluencer = new this.infuencerModel({
      ...dto,
      passwordHash: hashedPassword,
    });

    return newInfluencer.save();
  }

}


