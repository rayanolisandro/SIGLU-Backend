import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';
import { CreateInspeccioneDto } from './dto/create-inspeccione.dto.js';
import { UpdateInspeccioneDto } from './dto/update-inspeccione.dto.js';

@Injectable()
export class InspeccionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInspeccioneDto: CreateInspeccioneDto) {
    await this.validateSolicitud(createInspeccioneDto.solicitudId);
    await this.validateInspector(createInspeccioneDto.inspectorId);

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

      throw error;
    }
  }

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

    if (updateInspeccioneDto.solicitudId) {
      await this.validateSolicitud(updateInspeccioneDto.solicitudId);
    }

    if (updateInspeccioneDto.inspectorId) {
      await this.validateInspector(updateInspeccioneDto.inspectorId);
    }

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

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.inspeccion.delete({ where: { id } });
  }

  private async validateSolicitud(solicitudId: number) {
    const solicitud = await this.prisma.solicitud.findUnique({
      where: { id: solicitudId },
    });

    if (!solicitud) {
      throw new NotFoundException(
        `No existe una solicitud con id ${solicitudId}.`,
      );
    }
  }

  // El inspector es un usuario de la tabla User
  private async validateInspector(inspectorId: number) {
    const inspector = await this.prisma.user.findUnique({
      where: { id: inspectorId },
    });

    if (!inspector) {
      throw new NotFoundException(
        `No existe un inspector con id ${inspectorId}.`,
      );
    }
  }
}
