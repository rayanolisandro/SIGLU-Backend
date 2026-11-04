import { Test, TestingModule } from '@nestjs/testing';
import { ImbornalesController } from './imbornales.controller';
import { ImbornalesService } from './imbornales.service';

describe('ImbornalesController', () => {
  let controller: ImbornalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImbornalesController],
      providers: [ImbornalesService],
    }).compile();

    controller = module.get<ImbornalesController>(ImbornalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
