import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength, MaxLength } from 'class-validator';

export class CreateSolicitudeDto {
  @IsNotEmpty({ message: 'El tipo de servicio es obligatorio' })
  @IsIn(['Limpieza', 'Imbornal/desagüe', 'Desagote', 'Inspección'], { message: 'El tipo debe ser Limpieza, Imbornal/desagüe, Desagote o Inspección' })
  tipo: string;

  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @MinLength(3, { message: 'La ubicación debe tener al menos 3 caracteres' })
  @MaxLength(160, { message: 'La ubicación no puede superar los 160 caracteres' })
  ubicacion: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(1000, { message: 'La descripción no puede superar los 1000 caracteres' })
  descripcion: string;

  @IsNotEmpty({ message: 'La prioridad es obligatoria' })
  @IsIn(['Alta', 'Media', 'Baja'], { message: 'La prioridad debe ser Alta, Media o Baja' })
  prioridad: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(30, { message: 'El teléfono no puede superar los 30 caracteres' })
  telefonoContacto?: string;

  @IsOptional()
  @IsInt({ message: 'La instalación vinculada debe ser un número entero' })
  @Min(1, { message: 'La instalación vinculada debe ser mayor o igual a 1' })
  imbornalId?: number;

  @IsOptional()
  @IsIn(['Pendiente', 'Programado', 'Finalizado', 'Cancelado'], {
    message: 'El estado debe ser Pendiente, Programado, Finalizado o Cancelado',
  })
  estado?: string;

  @IsOptional()
  @IsInt({ message: 'El usuario debe ser un número entero' })
  @Min(1, { message: 'El usuario debe ser mayor o igual a 1' })
  userId?: number;
}