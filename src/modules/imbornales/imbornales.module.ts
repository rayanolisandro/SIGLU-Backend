import { Module } from '@nestjs/common';
import { ImbornalesService } from './imbornales.service.js';
import { ImbornalesController } from './imbornales.controller.js';

@Module({
  controllers: [ImbornalesController],
  providers: [ImbornalesService],
})
export class ImbornalesModule {}
