import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto.js';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto.js';

@Injectable()
export class SolicitudesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSolicitudeDto: CreateSolicitudeDto) {
    await this.validateUsuario(createSolicitudeDto.userId);

    if (createSolicitudeDto.imbornalId) {
      await this.validateImbornal(createSolicitudeDto.imbornalId);
    }

    return this.prisma.solicitud.create({
      data: {
        tipo: createSolicitudeDto.tipo,
        ubicacion: createSolicitudeDto.ubicacion,
        descripcion: createSolicitudeDto.descripcion,
        prioridad: createSolicitudeDto.prioridad,
        telefonoContacto: createSolicitudeDto.telefonoContacto,
        estado: createSolicitudeDto.estado,
        fecha: createSolicitudeDto.fecha
          ? new Date(createSolicitudeDto.fecha)
          : undefined,
        imbornalId: createSolicitudeDto.imbornalId,
        userId: createSolicitudeDto.userId,
      },
    });
  }

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

    if (updateSolicitudeDto.userId) {
      await this.validateUsuario(updateSolicitudeDto.userId);
    }

    if (updateSolicitudeDto.imbornalId) {
      await this.validateImbornal(updateSolicitudeDto.imbornalId);
    }

    return this.prisma.solicitud.update({
      where: { id },
      data: {
        tipo: updateSolicitudeDto.tipo,
        ubicacion: updateSolicitudeDto.ubicacion,
        descripcion: updateSolicitudeDto.descripcion,
        prioridad: updateSolicitudeDto.prioridad,
        telefonoContacto: updateSolicitudeDto.telefonoContacto,
        estado: updateSolicitudeDto.estado,
        fecha: updateSolicitudeDto.fecha
          ? new Date(updateSolicitudeDto.fecha)
          : undefined,
        imbornalId: updateSolicitudeDto.imbornalId,
        userId: updateSolicitudeDto.userId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.validateSinRegistrosAsociados(id);

    return this.prisma.solicitud.delete({ where: { id } });
  }

  private async validateUsuario(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`No existe un usuario con id ${userId}.`);
    }
  }

  private async validateImbornal(imbornalId: number) {
    const imbornal = await this.prisma.imbornal.findUnique({
      where: { id: imbornalId },
    });

    if (!imbornal) {
      throw new NotFoundException(
        `No existe un imbornal con id ${imbornalId}.`,
      );
    }
  }

  private async validateSinRegistrosAsociados(solicitudId: number) {
    const inspecciones = await this.prisma.inspeccion.count({
      where: { solicitudId },
    });
    const desagotes = await this.prisma.desagote.count({
      where: { solicitudId },
    });

    if (inspecciones > 0 || desagotes > 0) {
      throw new ConflictException(
        'No se puede borrar la solicitud porque tiene inspecciones o desagotes asociados.',
      );
    }
  }
}
