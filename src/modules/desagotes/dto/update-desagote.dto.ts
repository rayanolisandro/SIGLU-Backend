import { PartialType } from '@nestjs/mapped-types';
import { CreateDesagoteDto } from './create-desagote.dto.js';

export class UpdateDesagoteDto extends PartialType(CreateDesagoteDto) {}
