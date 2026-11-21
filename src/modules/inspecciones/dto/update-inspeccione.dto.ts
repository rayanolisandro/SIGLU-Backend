import { PartialType } from '@nestjs/mapped-types';
import { CreateInspeccioneDto } from './create-inspeccione.dto.js';

export class UpdateInspeccioneDto extends PartialType(CreateInspeccioneDto) {}
