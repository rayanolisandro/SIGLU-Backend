import { Module } from '@nestjs/common';
import { InspeccionesService } from './inspecciones.service.js';
import { InspeccionesController } from './inspecciones.controller.js';

@Module({
  controllers: [InspeccionesController],
  providers: [InspeccionesService],
})
export class InspeccionesModule {}
