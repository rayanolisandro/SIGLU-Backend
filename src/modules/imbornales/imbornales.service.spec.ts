import { Test, TestingModule } from '@nestjs/testing';
import { ImbornalesService } from './imbornales.service';

describe('ImbornalesService', () => {
  let service: ImbornalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImbornalesService],
    }).compile();

    service = module.get<ImbornalesService>(ImbornalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
