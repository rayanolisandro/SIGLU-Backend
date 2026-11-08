import { IsNotEmpty, IsString, IsNumber, IsDate, MinLength, MaxLength, IsPositive, MinDate } from 'class-validator';

export class CreateSolicitudeDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El título no puede superar los 100 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La descripción no puede superar los 500 caracteres' })
  descripcion: string;

  @IsNotEmpty({ message: 'El monto es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El monto debe ser un número con hasta 2 decimales' })
  @IsPositive({ message: 'El monto debe ser mayor a 0' })
  numero: number;

  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @IsDate({ message: 'La fecha debe ser una fecha válida' })
  @MinDate(new Date(), { message: 'La fecha no puede ser anterior a hoy' })
  fecha: Date;
}