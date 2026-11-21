import { PartialType } from '@nestjs/mapped-types';
import { CreateImbornaleDto } from './create-imbornale.dto.js';

export class UpdateImbornaleDto extends PartialType(CreateImbornaleDto) {}
