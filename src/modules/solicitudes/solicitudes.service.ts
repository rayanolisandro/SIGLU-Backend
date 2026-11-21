import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaForeignKeyError } from '../prisma/prisma-error.util.js';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto.js';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto.js';

@Injectable()
export class SolicitudesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSolicitudeDto: CreateSolicitudeDto) {
    try {
      return await this.prisma.solicitud.create({
        data: {
          ubicacion: createSolicitudeDto.ubicacion,
          descripcion: createSolicitudeDto.descripcion,
          prioridad: createSolicitudeDto.prioridad,
          telefonoContacto: createSolicitudeDto.telefonoContacto,
          // Si no mandan fecha, la base de datos pone la de hoy
          fecha: createSolicitudeDto.fecha
            ? new Date(createSolicitudeDto.fecha)
            : undefined,
          tipo: createSolicitudeDto.tipo,
          estado: createSolicitudeDto.estado,
          imbornalId: createSolicitudeDto.imbornalId,
          userId: createSolicitudeDto.userId,
        },
      });
    } catch (error) {
      // Alguno de los ids relacionados no existe
      if (isPrismaForeignKeyError(error)) {
        throw new BadRequestException(
          'El imbornal o el usuario indicados no existen.',
        );
      }

      throw error;
    }
  }

  // "include" trae también los datos de las tablas relacionadas
  findAll() {
    return this.prisma.solicitud.findMany({
      include: { imbornal: true },
    });
  }

  async findOne(id: number) {
    const solicitud = await this.prisma.solicitud.findUnique({
      where: { id },
      include: { imbornal: true },
    });

    if (!solicitud) {
      throw new NotFoundException(`No existe una solicitud con id ${id}.`);
    }

    return solicitud;
  }

  async update(id: number, updateSolicitudeDto: UpdateSolicitudeDto) {
    await this.findOne(id);

    try {
      // Si un campo no viene (undefined), Prisma no lo modifica
      return await this.prisma.solicitud.update({
        where: { id },
        data: {
          ubicacion: updateSolicitudeDto.ubicacion,
          descripcion: updateSolicitudeDto.descripcion,
          prioridad: updateSolicitudeDto.prioridad,
          telefonoContacto: updateSolicitudeDto.telefonoContacto,
          fecha: updateSolicitudeDto.fecha
            ? new Date(updateSolicitudeDto.fecha)
            : undefined,
          tipo: updateSolicitudeDto.tipo,
          estado: updateSolicitudeDto.estado,
          imbornalId: updateSolicitudeDto.imbornalId,
          userId: updateSolicitudeDto.userId,
        },
      });
    } catch (error) {
      if (isPrismaForeignKeyError(error)) {
        throw new BadRequestException(
          'El imbornal o el usuario indicados no existen.',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.solicitud.delete({ where: { id } });
    } catch (error) {
      // No se puede borrar si tiene inspecciones o desagotes cargados
      if (isPrismaForeignKeyError(error)) {
        throw new ConflictException(
          'No se puede borrar la solicitud porque tiene inspecciones o desagotes asociados.',
        );
      }

      throw error;
    }
  }
}
