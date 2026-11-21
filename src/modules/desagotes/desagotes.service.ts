import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaForeignKeyError } from '../prisma/prisma-error.util.js';
import { CreateDesagoteDto } from './dto/create-desagote.dto.js';
import { UpdateDesagoteDto } from './dto/update-desagote.dto.js';

@Injectable()
export class DesagotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDesagoteDto: CreateDesagoteDto) {
    // La hora de fin tiene que ser después de la hora de inicio
    if (createDesagoteDto.horaFin <= createDesagoteDto.horaInicio) {
      throw new BadRequestException(
        'La hora de fin tiene que ser posterior a la hora de inicio',
      );
    }

    try {
      return await this.prisma.desagote.create({
        data: {
          fecha: new Date(createDesagoteDto.fecha),
          horaInicio: createDesagoteDto.horaInicio,
          horaFin: createDesagoteDto.horaFin,
          estado: createDesagoteDto.estado,
          solicitudId: createDesagoteDto.solicitudId,
          unidadId: createDesagoteDto.unidadId,
        },
      });
    } catch (error) {
      // La solicitud o la unidad no existen
      if (isPrismaForeignKeyError(error)) {
        throw new BadRequestException(
          'La solicitud o la unidad indicadas no existen.',
        );
      }

      throw error;
    }
  }

  // "include" trae también los datos de las tablas relacionadas
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

    try {
      // Si un campo no viene (undefined), Prisma no lo modifica
      return await this.prisma.desagote.update({
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
    } catch (error) {
      if (isPrismaForeignKeyError(error)) {
        throw new BadRequestException(
          'La solicitud o la unidad indicadas no existen.',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.desagote.delete({ where: { id } });
  }
}
