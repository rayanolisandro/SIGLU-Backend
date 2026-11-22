import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DesagotesService } from './desagotes.service.js';
import { CreateDesagoteDto } from './dto/create-desagote.dto.js';
import { UpdateDesagoteDto } from './dto/update-desagote.dto.js';

@Controller('desagotes')
export class DesagotesController {
  constructor(private readonly desagotesService: DesagotesService) {}

  @Post()
  create(@Body() createDesagoteDto: CreateDesagoteDto) {
    return this.desagotesService.create(createDesagoteDto);
  }

  @Get()
  findAll() {
    return this.desagotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.desagotesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDesagoteDto: UpdateDesagoteDto,
  ) {
    return this.desagotesService.update(id, updateDesagoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.desagotesService.remove(id);
  }
}
