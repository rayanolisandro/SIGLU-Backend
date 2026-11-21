import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDesagoteDto } from './dto/create-desagote.dto.js';
import { UpdateDesagoteDto } from './dto/update-desagote.dto.js';

@Injectable()
export class DesagotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDesagoteDto: CreateDesagoteDto) {
    await this.validateSolicitud(createDesagoteDto.solicitudId);
    await this.validateUnidad(createDesagoteDto.unidadId);

    return this.prisma.desagote.create({
      data: {
        fecha: new Date(createDesagoteDto.fecha),
        horaInicio: createDesagoteDto.horaInicio,
        horaFin: createDesagoteDto.horaFin,
        estado: createDesagoteDto.estado,
        solicitudId: createDesagoteDto.solicitudId,
        unidadId: createDesagoteDto.unidadId,
      },
    });
  }

  findAll() {
    return this.prisma.desagote.findMany({
      include: { solicitud: true, unidad: true },
    });
  }

  async findOne(id: number) {
    const desagote = await this.prisma.desagote.findUnique({
      where: { id },
      include: { solicitud: true, unidad: true },
    });

    if (!desagote) {
      throw new NotFoundException(`No existe un desagote con id ${id}.`);
    }

    return desagote;
  }

  async update(id: number, updateDesagoteDto: UpdateDesagoteDto) {
    await this.findOne(id);

    if (updateDesagoteDto.solicitudId) {
      await this.validateSolicitud(updateDesagoteDto.solicitudId);
    }

    if (updateDesagoteDto.unidadId) {
      await this.validateUnidad(updateDesagoteDto.unidadId);
    }

    // Si un campo no viene (undefined), Prisma no lo modifica
    return this.prisma.desagote.update({
      where: { id },
      data: {
        fecha: updateDesagoteDto.fecha
          ? new Date(updateDesagoteDto.fecha)
          : undefined,
        horaInicio: updateDesagoteDto.horaInicio,
        horaFin: updateDesagoteDto.horaFin,
        estado: updateDesagoteDto.estado,
        solicitudId: updateDesagoteDto.solicitudId,
        unidadId: updateDesagoteDto.unidadId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.desagote.delete({ where: { id } });
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

  private async validateUnidad(unidadId: number) {
    const unidad = await this.prisma.unidad.findUnique({
      where: { id: unidadId },
    });

    if (!unidad) {
      throw new NotFoundException(`No existe una unidad con id ${unidadId}.`);
    }
  }
}
