import { Injectable } from '@nestjs/common';
import { CreateDesagoteDto } from './dto/create-desagote.dto';
import { UpdateDesagoteDto } from './dto/update-desagote.dto';

@Injectable()
export class DesagotesService {
  create(createDesagoteDto: CreateDesagoteDto) {
    return 'This action adds a new desagote';
  }

  findAll() {
    return `This action returns all desagotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desagote`;
  }

  update(id: number, updateDesagoteDto: UpdateDesagoteDto) {
    return `This action updates a #${id} desagote`;
  }

  remove(id: number) {
    return `This action removes a #${id} desagote`;
  }
}
