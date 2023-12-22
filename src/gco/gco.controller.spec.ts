import { Test, TestingModule } from '@nestjs/testing';
import { GcoController } from './gco.controller';
import { GcoService } from './gco.service';

describe('GcoController', () => {
  let controller: GcoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcoController],
      providers: [GcoService],
    }).compile();

    controller = module.get<GcoController>(GcoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
