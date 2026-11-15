import { Module } from '@nestjs/common';
import { DesagotesService } from './desagotes.service';
import { DesagotesController } from './desagotes.controller';

@Module({
  controllers: [DesagotesController],
  providers: [DesagotesService],
})
export class DesagotesModule {}
