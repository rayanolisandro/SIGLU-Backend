import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateInspeccionDto {
  @IsString()
  @IsNotEmpty({ message: 'El número de acta es obligatorio' })
  @MaxLength(30)
  numeroActa: string;

  @IsDateString({}, { message: 'La fecha debe tener formato AAAA-MM-DD' })
  @IsNotEmpty({ message: 'La fecha del acta es obligatoria' })
  fecha: string;

  @IsString()
  @IsNotEmpty({ message: 'El inspector es obligatorio' })
  @MaxLength(100)
  inspector: string;

  @IsString()
  @IsNotEmpty({ message: 'La referencia de la ordenanza es obligatoria' })
  @MaxLength(100)
  norma: string;

  @IsString()
  @IsNotEmpty({ message: 'El artículo es obligatorio' })
  @MaxLength(50)
  articulo: string;

  @IsString()
  @IsNotEmpty({ message: 'Los hechos observados son obligatorios' })
  observaciones: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  documento?: string;

  @IsOptional()
  @IsIn(['Registrada', 'Pendiente de derivación'], { message: 'Estado administrativo no válido' })
  estado?: string;

  @IsInt({ message: 'Debe seleccionar una solicitud válida' })
  @Min(1)
  solicitudId: number;
}