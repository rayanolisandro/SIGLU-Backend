import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudeDto } from './create-solicitude.dto.js';

export class UpdateSolicitudeDto extends PartialType(CreateSolicitudeDto) {}
