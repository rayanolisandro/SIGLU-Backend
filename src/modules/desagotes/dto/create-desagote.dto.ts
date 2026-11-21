import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateDesagoteDto {
  @IsDateString(
    {},
    { message: 'La fecha tiene que tener formato válido (ej: 2026-11-20)' },
  )
  fecha: string;

  @IsString({ message: 'La hora de inicio tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la hora de inicio' })
  @MaxLength(8, {
    message: 'La hora de inicio no puede pasar de 8 caracteres (ej: 08:30)',
  })
  horaInicio: string;

  @IsString({ message: 'La hora de fin tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la hora de fin' })
  @MaxLength(8, {
    message: 'La hora de fin no puede pasar de 8 caracteres (ej: 10:00)',
  })
  horaFin: string;

  @IsOptional()
  @IsString({ message: 'El estado tiene que ser texto' })
  @MaxLength(20, { message: 'El estado no puede pasar de 20 caracteres' })
  estado?: string;

  @IsInt({ message: 'Debe seleccionar una solicitud válida' })
  @Min(1, { message: 'El id de la solicitud tiene que ser mayor a 0' })
  solicitudId: number;

  @IsInt({ message: 'Debe seleccionar una unidad válida' })
  @Min(1, { message: 'El id de la unidad tiene que ser mayor a 0' })
  unidadId: number;
}
