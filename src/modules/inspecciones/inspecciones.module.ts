import { Module } from '@nestjs/common';
import { InspeccionesService } from './inspecciones.service';
import { InspeccionesController } from './inspecciones.controller';

@Module({
  controllers: [InspeccionesController],
  providers: [InspeccionesService],
})
export class InspeccionesModule {}
