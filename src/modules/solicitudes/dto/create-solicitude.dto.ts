import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSolicitudeDto {
  @IsString({ message: 'El tipo tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta indicar el tipo de solicitud' })
  @MaxLength(20, { message: 'El tipo no puede pasar de 20 caracteres' })
  tipo: string;

  @IsString({ message: 'La ubicación tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la ubicación' })
  @MaxLength(160, { message: 'La ubicación no puede pasar de 160 caracteres' })
  ubicacion: string;

  @IsString({ message: 'La descripción tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta escribir la descripción' })
  @MaxLength(1000, {
    message: 'La descripción no puede pasar de 1000 caracteres',
  })
  descripcion: string;

  @IsString({ message: 'La prioridad tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta indicar la prioridad' })
  @MaxLength(10, { message: 'La prioridad no puede pasar de 10 caracteres' })
  prioridad: string;

  @IsOptional()
  @IsString({ message: 'El teléfono de contacto tiene que ser texto' })
  @MaxLength(30, {
    message: 'El teléfono de contacto no puede pasar de 30 caracteres',
  })
  telefonoContacto?: string;

  @IsOptional()
  @IsString({ message: 'El estado tiene que ser texto' })
  @MaxLength(20, { message: 'El estado no puede pasar de 20 caracteres' })
  estado?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha tiene que tener formato válido (ej: 2026-11-20)' },
  )
  fecha?: string;

  @IsOptional()
  @IsInt({ message: 'Debe seleccionar un imbornal válido' })
  @Min(1, { message: 'El id del imbornal tiene que ser mayor a 0' })
  imbornalId?: number;

  @IsInt({ message: 'Debe indicar un usuario válido' })
  @Min(1, { message: 'El id del usuario tiene que ser mayor a 0' })
  userId: number;
}
