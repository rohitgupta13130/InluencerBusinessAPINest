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
  // Make sure frontend sends passwordHash
  if (!dto.passwordHash) {
    throw new Error('Password is required');
  }

  // Hash the incoming password (even though it's named "passwordHash" in frontend)
  const hashedPassword = await bcrypt.hash(dto.passwordHash, 10);

  const newInfluencer = new this.infuencerModel({
    fullName: dto.fullName,
    email: dto.email,
    username: dto.username,
    passwordHash: hashedPassword,  // 👈 final hash stored in DB
    bio: dto.bio,
    profilePicUrl: dto.profilePicUrl,
    category: dto.category,
    followersCount: dto.followersCount,
    platform: dto.platform,
    socialhandle: dto.socialhandle,
  });

  return newInfluencer.save();
}


}


