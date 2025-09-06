import { Test, TestingModule } from '@nestjs/testing';
import { GuidController } from './guid.controller';

describe('GuidController', () => {
  let controller: GuidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuidController],
    }).compile();

    controller = module.get<GuidController>(GuidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
