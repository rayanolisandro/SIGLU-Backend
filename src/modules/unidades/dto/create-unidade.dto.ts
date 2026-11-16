import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUnidadeDto {
  @IsNotEmpty({ message: 'El número de interno es obligatorio' })
  @IsInt({ message: 'El número de interno debe ser un número entero' })
  @Min(1, { message: 'El número de interno debe ser mayor o igual a 1' })
  interno: number;

  @IsNotEmpty({ message: 'La marca y modelo son obligatorios' })
  @IsString({ message: 'La marca y modelo deben ser una cadena de texto' })
  @MinLength(2, { message: 'La marca y modelo deben tener al menos 2 caracteres' })
  @MaxLength(60, { message: 'La marca y modelo no pueden superar los 60 caracteres' })
  marcaModelo: string;

  @IsNotEmpty({ message: 'El dominio es obligatorio' })
  @IsString({ message: 'El dominio debe ser una cadena de texto' })
  @MinLength(6, { message: 'El dominio debe tener al menos 6 caracteres' })
  @MaxLength(10, { message: 'El dominio no puede superar los 10 caracteres' })
  dominio: string;

  @IsNotEmpty({ message: 'El tipo de unidad es obligatorio' })
  @IsIn(['Atmosférico', 'Recolector', 'Barredora', 'Camioneta'], {
    message: 'El tipo debe ser Atmosférico, Recolector, Barredora o Camioneta',
  })
  tipo: string;

  @IsOptional()
  @IsIn(['Operativa', 'En mantenimiento'], {
    message: 'El estado debe ser Operativa o En mantenimiento',
  })
  estado?: string;
}