import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString({ message: 'El nombre tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el nombre' })
  @MinLength(2, { message: 'El nombre es muy corto (mínimo 2 letras)' })
  @MaxLength(50, { message: 'El nombre no puede pasar de 50 caracteres' })
  nombre: string;

  @IsString({ message: 'El apellido tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el apellido' })
  @MinLength(2, { message: 'El apellido es muy corto (mínimo 2 letras)' })
  @MaxLength(50, { message: 'El apellido no puede pasar de 50 caracteres' })
  apellido: string;

  @IsString({ message: 'El CUIL tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el CUIL' })
  @MinLength(11, {
    message: 'El CUIL tiene que tener 11 números (sin guiones)',
  })
  @MaxLength(11, {
    message: 'El CUIL tiene que tener 11 números (sin guiones)',
  })
  cuil: string;

  @IsString({ message: 'El legajo tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar el legajo' })
  @MaxLength(20, { message: 'El legajo no puede pasar de 20 caracteres' })
  legajo: string;

  @IsString({ message: 'El área tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta indicar el área' })
  @MaxLength(40, { message: 'El área no puede pasar de 40 caracteres' })
  area: string;

  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;

  @IsString({ message: 'La contraseña tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la contraseña' })
  @MinLength(8, {
    message: 'La contraseña tiene que tener al menos 8 caracteres',
  })
  @MaxLength(72, {
    message: 'La contraseña es demasiado larga (máximo 72 caracteres)',
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'El rol tiene que ser texto' })
  @MaxLength(20, { message: 'El rol no puede pasar de 20 caracteres' })
  rol?: string;
}
