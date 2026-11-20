import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateInspeccioneDto {
  @IsString({ message: 'El número de acta tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el número de acta' })
  @MaxLength(30, { message: 'El número de acta no puede pasar de 30 caracteres' })
  numeroActa: string;

  @IsDateString({}, { message: 'La fecha tiene que tener formato válido (ej: 2026-11-20)' })
  fecha: string;

  @IsString({ message: 'La norma tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la norma' })
  @MaxLength(100, { message: 'La norma no puede pasar de 100 caracteres' })
  norma: string;

  @IsString({ message: 'El artículo tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el artículo' })
  @MaxLength(50, { message: 'El artículo no puede pasar de 50 caracteres' })
  articulo: string;

  @IsString({ message: 'Las observaciones tienen que ser texto' })
  @IsNotEmpty({ message: 'Falta escribir las observaciones' })
  observaciones: string;

  @IsOptional()
  @IsString({ message: 'El documento tiene que ser texto' })
  @MaxLength(100, { message: 'El documento no puede pasar de 100 caracteres' })
  documento?: string;

  @IsOptional()
  @IsString({ message: 'El estado tiene que ser texto' })
  @MaxLength(30, { message: 'El estado no puede pasar de 30 caracteres' })
  estado?: string;

  @IsInt({ message: 'Debe seleccionar una solicitud válida' })
  @Min(1, { message: 'El id de la solicitud tiene que ser mayor a 0' })
  solicitudId: number;

  @IsInt({ message: 'Debe seleccionar un inspector válido' })
  @Min(1, { message: 'El id del inspector tiene que ser mayor a 0' })
  inspectorId: number;
}