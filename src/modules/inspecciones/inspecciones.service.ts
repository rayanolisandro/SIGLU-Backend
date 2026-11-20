import { Injectable } from '@nestjs/common';
import { CreateInspeccioneDto } from './dto/create-inspeccione.dto.js';
import { UpdateInspeccioneDto } from './dto/update-inspeccione.dto.js';

@Injectable()
export class InspeccionesService {
  create(createInspeccioneDto: CreateInspeccioneDto) {
    return 'This action adds a new inspeccione';
  }

  findAll() {
    return `This action returns all inspecciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inspeccione`;
  }

  update(id: number, updateInspeccioneDto: UpdateInspeccioneDto) {
    return `This action updates a #${id} inspeccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} inspeccione`;
  }
}
