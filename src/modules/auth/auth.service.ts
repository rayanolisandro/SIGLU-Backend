import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';
import { hashPassword, verifyPassword } from './password.util.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const passwordHash = await hashPassword(registerAuthDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...registerAuthDto,
          password: passwordHash,
        },
        select: {
          id: true,
          nombre: true,
          apellido: true,
          cuil: true,
          legajo: true,
          area: true,
          email: true,
          rol: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe un usuario con ese correo, CUIL o legajo.',
        );
      }

      throw error;
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginAuthDto.email },
    });

    if (
      !user ||
      !(await verifyPassword(loginAuthDto.password, user.password))
    ) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        cuil: user.cuil,
        legajo: user.legajo,
        area: user.area,
        email: user.email,
        rol: user.rol,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
