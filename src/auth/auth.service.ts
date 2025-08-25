import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

constructor(private jwtService: JwtService) {}

  // Mock user - replace with DB check
  private users = [
  {
    id: 1,
    username: 'rohit',
    // hash of "mypassword"
    password: 'mypassword'
  }
];


    async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(u => u.username === username);
    if (user &&  user.password == pass) {
      const { password, ...result } = user;
      console.log(user.username + ' '+user.password);
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

    async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
