import { PartialType } from '@nestjs/mapped-types';
import { CreateInspeccioneDto } from './create-inspeccione.dto';

export class UpdateInspeccioneDto extends PartialType(CreateInspeccioneDto) {}
