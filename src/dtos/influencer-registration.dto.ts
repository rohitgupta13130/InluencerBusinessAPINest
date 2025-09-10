import { IsString, IsOptional, IsNumber, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class InfluencerRegistrationDto {
  @IsString()
  fullName: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  passwordHash: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profilePicUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number) // ✅ converts string → number before validation
  @IsNumber({}, { message: 'Followers count must be a number' })
  followersCount?: number;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  socialHandle?: string;
}
