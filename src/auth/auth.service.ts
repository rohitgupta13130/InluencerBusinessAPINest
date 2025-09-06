import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {

constructor(
  private jwtService: JwtService,
  @InjectModel(User.name) private userModel: Model<UserDocument>,
) {}

//   // Mock user - replace with DB check
//   private users = [
//   {
//     id: 1,
//     username: 'rohit',
//     // hash of "mypassword"
//     password: 'mypassword'
//   }
// ];


    async register(username: string, password: string) {
      const existingUser = await this.userModel.findOne({ username }).exec();
      if (existingUser) {
        throw new UnauthorizedException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({ username, password: hashedPassword });
      return newUser.save();
    }


    async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({username}).exec();
    if (!user ) {
      throw new UnauthorizedException('User not found');
      
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if(!isMatch){
      throw new UnauthorizedException('Invalid credentials');
    }
    const {password, ...result} = user.toObject();
    return result;
    }

    async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
