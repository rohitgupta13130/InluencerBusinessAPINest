import { Controller,Get, Post, Body  } from '@nestjs/common';
import { InfluencerService } from './influencer.service'; 
import { Influencer } from 'src/schemas/influencer.schema';
import { InfluencerRegistrationDto } from '../dtos/influencer-registration.dto';

@Controller('influencer')
export class InfluencerController {

    constructor(private readonly influencerService: InfluencerService){}

    @Get()
    getALL(): Promise<Influencer[]>{
        return this.influencerService.findAll();
    }

    @Post()
    async create(@Body() influencer: Partial<Influencer>) : Promise<Influencer>{
        return this.influencerService.create(influencer as Influencer);
    }

     @Post('register')
    async register(@Body() dto: InfluencerRegistrationDto): Promise<Influencer> {
       return this.influencerService.register(dto);
    }

}

