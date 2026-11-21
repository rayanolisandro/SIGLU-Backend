import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;

  @IsString({ message: 'La contraseña tiene que ser texto' })
  @IsNotEmpty({ message: 'Falta ingresar la contraseña' })
  @MinLength(8, { message: 'La contraseña tiene que tener al menos 8 caracteres' })
  @MaxLength(72, { message: 'La contraseña no puede pasar de 72 caracteres' })
  password: string;
}