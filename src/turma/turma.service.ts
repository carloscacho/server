import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TurmaDTO } from './dto/turma.dto';

@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) { }

  async create(data: TurmaDTO) {
    return this.prisma.turma.create({ data });
  }

  async findAll() {
    return this.prisma.turma.findMany();
  }

  async findById(id_turma: number) {
    return this.prisma.turma.findUnique({ where: { id_turma } });
  }

  async update(id_turma: number, data: TurmaDTO) {
    return this.prisma.turma.update({ where: { id_turma }, data });
  }

  async delete(id_turma: number) {
    try {
      return await this.prisma.turma.delete({ where: { id_turma } });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Não é possível deletar esta turma pois ela está vinculada a outros registros.');
      }
      throw error;
    }
  }
}
