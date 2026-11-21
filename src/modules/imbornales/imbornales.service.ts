import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateImbornaleDto } from './dto/create-imbornale.dto.js';
import { UpdateImbornaleDto } from './dto/update-imbornale.dto.js';

@Injectable()
export class ImbornalesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createImbornaleDto: CreateImbornaleDto) {
    return this.prisma.imbornal.create({ data: createImbornaleDto });
  }

  findAll() {
    return this.prisma.imbornal.findMany();
  }

  async findOne(id: number) {
    const imbornal = await this.prisma.imbornal.findUnique({ where: { id } });

    if (!imbornal) {
      throw new NotFoundException(`No existe un imbornal con id ${id}.`);
    }

    return imbornal;
  }

  async update(id: number, updateImbornaleDto: UpdateImbornaleDto) {
    await this.findOne(id);

    return this.prisma.imbornal.update({
      where: { id },
      data: updateImbornaleDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    // Si el imbornal tiene solicitudes, quedan sin imbornal (imbornalId en null)
    return this.prisma.imbornal.delete({ where: { id } });
  }
}
