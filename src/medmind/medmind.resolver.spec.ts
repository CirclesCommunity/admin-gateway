import { Test, TestingModule } from '@nestjs/testing';
import { MedmindResolver } from './medmind.resolver';

describe('MedmindResolver', () => {
  let resolver: MedmindResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedmindResolver],
    }).compile();

    resolver = module.get<MedmindResolver>(MedmindResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
