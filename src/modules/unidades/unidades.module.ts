import { Module } from '@nestjs/common';
import { UnidadesService } from './unidades.service.js';
import { UnidadesController } from './unidades.controller.js';

@Module({
  controllers: [UnidadesController],
  providers: [UnidadesService],
})
export class UnidadesModule {}
