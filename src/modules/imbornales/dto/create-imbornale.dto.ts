import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateImbornaleDto {
  @IsString({ message: 'La ubicación tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la ubicación' })
  @MaxLength(160, { message: 'La ubicación no puede pasar de 160 caracteres' })
  ubicacion: string;

  @IsString({ message: 'El tipo tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta indicar el tipo' })
  @MaxLength(20, { message: 'El tipo no puede pasar de 20 caracteres' })
  tipo: string;

  @IsOptional()
  @IsString({ message: 'El estado de limpieza tiene que ser texto' })
  @MaxLength(20, {
    message: 'El estado de limpieza no puede pasar de 20 caracteres',
  })
  limpieza?: string;

  @IsOptional()
  @IsString({ message: 'El estado de la estructura tiene que ser texto' })
  @MaxLength(20, {
    message: 'El estado de la estructura no puede pasar de 20 caracteres',
  })
  estructura?: string;
}
