import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InfluencerDocument = Influencer & Document;

@Schema({ collection: 'Influencer' })  // 👈 important: use your exact collection name
export class Influencer {
  @Prop() fullName: string;
  @Prop() email: string;
  @Prop() username: string;
  @Prop() passwordHash: string;
  @Prop() bio?: string;
  @Prop() profilePicUrl?: string;
  @Prop() category?: string;
  @Prop() followersCount?: number;
  @Prop() platform?: string;
  @Prop() socialHandle?: string;
}

export const InfluencerSchema = SchemaFactory.createForClass(Influencer);
