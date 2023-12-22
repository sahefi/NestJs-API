import { Test, TestingModule } from '@nestjs/testing';
import { GcoService } from './gco.service';

describe('GcoService', () => {
  let service: GcoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcoService],
    }).compile();

    service = module.get<GcoService>(GcoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
