import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InspeccionesService } from './inspecciones.service.js';
import { CreateInspeccioneDto } from './dto/create-inspeccione.dto.js';
import { UpdateInspeccioneDto } from './dto/update-inspeccione.dto.js';

@Controller('inspecciones')
export class InspeccionesController {
  constructor(private readonly inspeccionesService: InspeccionesService) {}

  @Post()
  create(@Body() createInspeccioneDto: CreateInspeccioneDto) {
    return this.inspeccionesService.create(createInspeccioneDto);
  }

  @Get()
  findAll() {
    return this.inspeccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspeccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInspeccioneDto: UpdateInspeccioneDto) {
    return this.inspeccionesService.update(+id, updateInspeccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspeccionesService.remove(+id);
  }
}
