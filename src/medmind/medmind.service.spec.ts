import { Test, TestingModule } from '@nestjs/testing';
import { MedmindService } from './medmind.service';

describe('MedmindService', () => {
  let service: MedmindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedmindService],
    }).compile();

    service = module.get<MedmindService>(MedmindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
