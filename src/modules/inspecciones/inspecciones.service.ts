import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  isPrismaForeignKeyError,
  isPrismaUniqueConstraintError,
} from '../prisma/prisma-error.util.js';
import { CreateInspeccioneDto } from './dto/create-inspeccione.dto.js';
import { UpdateInspeccioneDto } from './dto/update-inspeccione.dto.js';

@Injectable()
export class InspeccionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInspeccioneDto: CreateInspeccioneDto) {
    try {
      return await this.prisma.inspeccion.create({
        data: {
          numeroActa: createInspeccioneDto.numeroActa,
          fecha: new Date(createInspeccioneDto.fecha),
          norma: createInspeccioneDto.norma,
          articulo: createInspeccioneDto.articulo,
          observaciones: createInspeccioneDto.observaciones,
          documento: createInspeccioneDto.documento,
          estado: createInspeccioneDto.estado,
          solicitudId: createInspeccioneDto.solicitudId,
          inspectorId: createInspeccioneDto.inspectorId,
        },
      });
    } catch (error) {
      // El número de acta es único: si ya existe, Prisma tira error
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe una inspección con ese número de acta.',
        );
      }

      // La solicitud o el inspector no existen
      if (isPrismaForeignKeyError(error)) {
        throw new BadRequestException(
          'La solicitud o el inspector indicados no existen.',
        );
      }

      throw error;
    }
  }

  // "include" trae también los datos de las tablas relacionadas
  findAll() {
    return this.prisma.inspeccion.findMany({
      include: {
        solicitud: true,
        inspector: { select: { id: true, nombre: true, apellido: true } },
      },
    });
  }

  async findOne(id: number) {
    const inspeccion = await this.prisma.inspeccion.findUnique({
      where: { id },
      include: {
        solicitud: true,
        inspector: { select: { id: true, nombre: true, apellido: true } },
      },
    });

    if (!inspeccion) {
      throw new NotFoundException(`No existe una inspección con id ${id}.`);
    }

    return inspeccion;
  }

  async update(id: number, updateInspeccioneDto: UpdateInspeccioneDto) {
    await this.findOne(id);

    try {
      // Si un campo no viene (undefined), Prisma no lo modifica
      return await this.prisma.inspeccion.update({
        where: { id },
        data: {
          numeroActa: updateInspeccioneDto.numeroActa,
          fecha: updateInspeccioneDto.fecha
            ? new Date(updateInspeccioneDto.fecha)
            : undefined,
          norma: updateInspeccioneDto.norma,
          articulo: updateInspeccioneDto.articulo,
          observaciones: updateInspeccioneDto.observaciones,
          documento: updateInspeccioneDto.documento,
          estado: updateInspeccioneDto.estado,
          solicitudId: updateInspeccioneDto.solicitudId,
          inspectorId: updateInspeccioneDto.inspectorId,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe una inspección con ese número de acta.',
        );
      }

      if (isPrismaForeignKeyError(error)) {
        throw new BadRequestException(
          'La solicitud o el inspector indicados no existen.',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.inspeccion.delete({ where: { id } });
  }
}
