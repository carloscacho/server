import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DataAtividadeParticipanteDTO } from './dto/data-atividade-participante.dto';

@Injectable()
export class DataAtividadeParticipanteService {
  constructor(private prisma: PrismaService) {}

  async create(data: DataAtividadeParticipanteDTO) {
    return this.prisma.data_atividade_participante.create({ data });
  }

  async findAll() {
    return this.prisma.data_atividade_participante.findMany();
  }

  async findById(fk_data_atividade: number, fk_participante: number) {
    return this.prisma.data_atividade_participante.findUnique({
      where: { fk_data_atividade_fk_participante: { fk_data_atividade, fk_participante } },
    });
  }

  async update(fk_data_atividade: number, fk_participante: number, data: DataAtividadeParticipanteDTO) {
    return this.prisma.data_atividade_participante.update({
      where: { fk_data_atividade_fk_participante: { fk_data_atividade, fk_participante } },
      data,
    });
  }

  async delete(fk_data_atividade: number, fk_participante: number) {
    return this.prisma.data_atividade_participante.delete({
      where: { fk_data_atividade_fk_participante: { fk_data_atividade, fk_participante } },
    });
  }
}