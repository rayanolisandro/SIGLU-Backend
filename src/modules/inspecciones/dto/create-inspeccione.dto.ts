import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateInspeccioneDto {
  @IsString({ message: 'El número de acta debe ser texto' })
  @IsNotEmpty({ message: 'El número de acta es obligatorio' })
  @MaxLength(30)
  numeroActa: string;

  @IsDateString({}, { message: 'La fecha debe tener formato AAAA-MM-DD' })
  @IsNotEmpty({ message: 'La fecha del acta es obligatoria' })
  fecha: string;

  @IsString({ message: 'El nombre del inspector debe ser texto' })
  @IsNotEmpty({ message: 'El inspector es obligatorio' })
  @MaxLength(100)
  inspector: string;

  @IsString({ message: 'La referencia de la ordenanza debe ser texto' })
  @IsNotEmpty({ message: 'La referencia de la ordenanza es obligatoria' })
  @MaxLength(100)
  norma: string;

  @IsString({ message: 'El artículo debe ser texto' })
  @IsNotEmpty({ message: 'El artículo es obligatorio' })
  @MaxLength(50)
  articulo: string;

  @IsString({ message: 'Las observaciones deben ser texto' })
  @IsNotEmpty({ message: 'Los hechos observados son obligatorios' })
  observaciones: string;

  @IsOptional()
  @IsString({ message: 'El documento debe ser texto' })
  @MaxLength(100)
  documento?: string;

  @IsOptional()
  @IsIn(['Registrada', 'Pendiente de derivación'], { message: 'Estado administrativo no válido' })
  estado?: string;

  @IsInt({ message: 'Debe seleccionar una solicitud válida' })
  @Min(1, { message: 'La solicitud debe ser mayor o igual a 1' })
  solicitudId: number;
}