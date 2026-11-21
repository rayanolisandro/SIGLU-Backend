import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UsersModule } from '../users/users.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { SolicitudesModule } from '../solicitudes/solicitudes.module.js';
import { UnidadesModule } from '../unidades/unidades.module.js';
import { ImbornalesModule } from '../imbornales/imbornales.module.js';
import { InspeccionesModule } from '../inspecciones/inspecciones.module.js';
import { DesagotesModule } from '../desagotes/desagotes.module.js';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    SolicitudesModule,
    UnidadesModule,
    ImbornalesModule,
    InspeccionesModule,
    DesagotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}