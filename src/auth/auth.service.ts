import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Influencer, InfluencerDocument } from '../schemas/influencer.schema';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Influencer.name) private influencerModel: Model<InfluencerDocument>,
  ) {}


  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.influencerModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash: _, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
