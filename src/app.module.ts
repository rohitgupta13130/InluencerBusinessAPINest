import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluencerModule } from './influencer/influencer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GuidModule } from './guid/guid.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://technotopsolutions_db_user:kT5vjYp7uJX1rvG9@cluster0.ibqc8gx.mongodb.net/InfluencerApp?retryWrites=true&w=majority&appName=Cluster0'),
    //  MongooseModule.forRoot('mongodb://127.0.0.1:27017/InfluencerApp'),
    InfluencerModule,
    AuthModule,
    GuidModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
