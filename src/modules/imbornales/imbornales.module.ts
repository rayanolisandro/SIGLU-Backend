import { Module } from '@nestjs/common';
import { ImbornalesService } from './imbornales.service';
import { ImbornalesController } from './imbornales.controller';

@Module({
  controllers: [ImbornalesController],
  providers: [ImbornalesService],
})
export class ImbornalesModule {}
