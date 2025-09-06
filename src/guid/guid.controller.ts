import { Controller,Get } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Controller('guid')
export class GuidController {

    @Get('new')
    getNewGuid() {
    const guid = uuidv4();
    return {
    guid,
    issuedAt: new Date().toISOString(),
    };
  }
}
