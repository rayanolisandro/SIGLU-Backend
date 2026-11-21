import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  isPrismaForeignKeyError,
  isPrismaUniqueConstraintError,
} from '../prisma/prisma-error.util.js';
import { CreateUnidadeDto } from './dto/create-unidade.dto.js';
import { UpdateUnidadeDto } from './dto/update-unidade.dto.js';

@Injectable()
export class UnidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnidadeDto: CreateUnidadeDto) {
    try {
      return await this.prisma.unidad.create({ data: createUnidadeDto });
    } catch (error) {
      // El interno y el dominio son únicos: si ya existen, Prisma tira error
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe una unidad con ese número de interno o dominio.',
        );
      }

      throw error;
    }
  }

  findAll() {
    return this.prisma.unidad.findMany();
  }

  async findOne(id: number) {
    const unidad = await this.prisma.unidad.findUnique({ where: { id } });

    if (!unidad) {
      throw new NotFoundException(`No existe una unidad con id ${id}.`);
    }

    return unidad;
  }

  async update(id: number, updateUnidadeDto: UpdateUnidadeDto) {
    await this.findOne(id);

    try {
      return await this.prisma.unidad.update({
        where: { id },
        data: updateUnidadeDto,
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe una unidad con ese número de interno o dominio.',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.unidad.delete({ where: { id } });
    } catch (error) {
      // No se puede borrar si tiene desagotes cargados
      if (isPrismaForeignKeyError(error)) {
        throw new ConflictException(
          'No se puede borrar la unidad porque tiene desagotes asociados.',
        );
      }

      throw error;
    }
  }
}
