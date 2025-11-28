import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TurnoDTO } from './dto/turno.dto';

@Injectable()
export class TurnoService {
  constructor(private prisma: PrismaService) { }

  async create(data: TurnoDTO) {
    return this.prisma.turno.create({ data });
  }

  async findAll() {
    return this.prisma.turno.findMany();
  }

  async findById(id_turno: number) {
    return this.prisma.turno.findUnique({ where: { id_turno } });
  }

  async update(id_turno: number, data: TurnoDTO) {
    return this.prisma.turno.update({ where: { id_turno }, data });
  }

  async delete(id_turno: number) {
    try {
      return await this.prisma.turno.delete({ where: { id_turno } });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Não é possível deletar este turno pois ele está vinculado a outros registros.');
      }
      throw error;
    }
  }
}
