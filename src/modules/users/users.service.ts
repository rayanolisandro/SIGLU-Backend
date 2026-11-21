import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  isPrismaForeignKeyError,
  isPrismaUniqueConstraintError,
} from '../prisma/prisma-error.util.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // En todas las consultas usamos "select" para elegir qué campos devolver
  // y así no mandar nunca la contraseña.

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        cuil: true,
        legajo: true,
        email: true,
        rol: true,
        area: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        cuil: true,
        legajo: true,
        email: true,
        rol: true,
        area: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          nombre: true,
          apellido: true,
          cuil: true,
          legajo: true,
          email: true,
          rol: true,
          area: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe un usuario con ese correo, CUIL o legajo.',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.user.delete({
        where: { id },
        select: { id: true, nombre: true, apellido: true, email: true },
      });
    } catch (error) {
      // No se puede borrar si tiene solicitudes o inspecciones cargadas
      if (isPrismaForeignKeyError(error)) {
        throw new ConflictException(
          'No se puede borrar el usuario porque tiene solicitudes o inspecciones asociadas.',
        );
      }

      throw error;
    }
  }
}
