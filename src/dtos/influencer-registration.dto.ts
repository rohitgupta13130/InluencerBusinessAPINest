import { IsString, IsOptional, IsNumber, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class InfluencerRegistrationDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
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
  @Type(() => Number)   // 👈 convert to number first
  @IsNumber()
  followersCount?: number;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  socialhandle?: string;
}
