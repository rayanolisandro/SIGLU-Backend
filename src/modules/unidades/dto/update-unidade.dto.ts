import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadeDto } from './create-unidade.dto.js';

export class UpdateUnidadeDto extends PartialType(CreateUnidadeDto) {}
