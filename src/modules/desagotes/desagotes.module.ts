import { Module } from '@nestjs/common';
import { DesagotesService } from './desagotes.service.js';
import { DesagotesController } from './desagotes.controller.js';

@Module({
  controllers: [DesagotesController],
  providers: [DesagotesService],
})
export class DesagotesModule {}
