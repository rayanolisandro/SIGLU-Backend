import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImbornalesService } from './imbornales.service';
import { CreateImbornaleDto } from './dto/create-imbornale.dto';
import { UpdateImbornaleDto } from './dto/update-imbornale.dto';

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
  findOne(@Param('id') id: string) {
    return this.imbornalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImbornaleDto: UpdateImbornaleDto) {
    return this.imbornalesService.update(+id, updateImbornaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imbornalesService.remove(+id);
  }
}
