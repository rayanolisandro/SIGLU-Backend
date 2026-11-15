import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesagotesService } from './desagotes.service';
import { CreateDesagoteDto } from './dto/create-desagote.dto';
import { UpdateDesagoteDto } from './dto/update-desagote.dto';

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
  findOne(@Param('id') id: string) {
    return this.desagotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesagoteDto: UpdateDesagoteDto) {
    return this.desagotesService.update(+id, updateDesagoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desagotesService.remove(+id);
  }
}
