import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateUnidadeDto {
  @IsInt({ message: 'El número de interno tiene que ser un número entero' })
  @Min(1, { message: 'El número de interno tiene que ser mayor a 0' })
  interno: number;

  @IsString({ message: 'La marca tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la marca' })
  @MaxLength(40, { message: 'La marca no puede pasar de 40 caracteres' })
  marca: string;

  @IsString({ message: 'El modelo tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el modelo' })
  @MaxLength(40, { message: 'El modelo no puede pasar de 40 caracteres' })
  modelo: string;

  @IsString({ message: 'El dominio tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el dominio (patente)' })
  @MaxLength(10, { message: 'El dominio no puede pasar de 10 caracteres' })
  dominio: string;

  @IsString({ message: 'El tipo tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta indicar el tipo de unidad' })
  @MaxLength(20, { message: 'El tipo no puede pasar de 20 caracteres' })
  tipo: string;

  @IsOptional()
  @IsString({ message: 'El estado tiene que ser texto' })
  @MaxLength(20, { message: 'El estado no puede pasar de 20 caracteres' })
  estado?: string;

  @IsOptional()
  @IsInt({ message: 'El kilometraje tiene que ser un número entero' })
  @Min(0, { message: 'El kilometraje no puede ser negativo' })
  kilometraje?: number;

  @IsOptional()
  @IsInt({ message: 'El próximo service tiene que ser un número entero de km' })
  @Min(0, { message: 'El próximo service no puede ser negativo' })
  proximoServiceKm?: number;
}
