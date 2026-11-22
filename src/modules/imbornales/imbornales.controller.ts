import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ImbornalesService } from './imbornales.service.js';
import { CreateImbornaleDto } from './dto/create-imbornale.dto.js';
import { UpdateImbornaleDto } from './dto/update-imbornale.dto.js';

@Controller('imbornales')
export class ImbornalesController {
  constructor(private readonly imbornalesService: ImbornalesService) {}

  @Post()
  create(@Body() createImbornaleDto: CreateImbornaleDto) {
    return this.imbornalesService.create(createImbornaleDto);
  }

  @Get()
  findAll() {
    return this.imbornalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imbornalesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateImbornaleDto: UpdateImbornaleDto,
  ) {
    return this.imbornalesService.update(id, updateImbornaleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imbornalesService.remove(id);
  }
}
