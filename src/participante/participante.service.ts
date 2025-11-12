import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ParticipanteDTO } from './dto/participante.dto';

@Injectable()
export class ParticipanteService {
  constructor(private prisma: PrismaService) {}

  async create(data: ParticipanteDTO) {
    return this.prisma.participante.create({ data });
  }

  async findAll() {
    return this.prisma.participante.findMany();
  }

  async findById(id_participante: number) {
    return this.prisma.participante.findUnique({ where: { id_participante } });
  }

  async update(id_participante: number, data: ParticipanteDTO) {
    return this.prisma.participante.update({
      where: { id_participante },
      data,
    });
  }

  async delete(id_participante: number) {
    return this.prisma.participante.delete({ where: { id_participante } });
  }
}
