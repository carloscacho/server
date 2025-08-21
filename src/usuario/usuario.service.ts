import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsuarioDTO } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: UsuarioDTO) {
    return this.prisma.usuario.create({ data });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findById(id_usuario: number) {
    return this.prisma.usuario.findUnique({ where: { id_usuario } });
  }

  async update(id_usuario: number, data: UsuarioDTO) {
    return this.prisma.usuario.update({ where: { id_usuario }, data });
  }

  async delete(id_usuario: number) {
    return this.prisma.usuario.delete({ where: { id_usuario } });
  }
}