import { Injectable } from '@nestjs/common';
import { CreateImbornaleDto } from './dto/create-imbornale.dto';
import { UpdateImbornaleDto } from './dto/update-imbornale.dto';

@Injectable()
export class ImbornalesService {
  create(createImbornaleDto: CreateImbornaleDto) {
    return 'This action adds a new imbornale';
  }

  findAll() {
    return `This action returns all imbornales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imbornale`;
  }

  update(id: number, updateImbornaleDto: UpdateImbornaleDto) {
    return `This action updates a #${id} imbornale`;
  }

  remove(id: number) {
    return `This action removes a #${id} imbornale`;
  }
}
