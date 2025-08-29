import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DataAtividadeParticipanteDTO } from './dto/data-atividade-participante.dto';

@Injectable()
export class DataAtividadeParticipanteService {
  constructor(private prisma: PrismaService) {}

  async create(data: DataAtividadeParticipanteDTO) {
    // Convert 'presenca' from boolean to number if defined
    const prismaData = {
      ...data,
      presenca: typeof data.presenca === 'boolean' ? (data.presenca ? 1 : 0) : data.presenca,
    };
    return this.prisma.data_atividade_participante.create({ data: prismaData });
  }

  async findAll() {
    return this.prisma.data_atividade_participante.findMany();
  }

  async findById(fk_data_atividade: number, fk_participante: number) {
    return this.prisma.data_atividade_participante.findUnique({
      where: {
        fk_data_atividade_fk_participante: {
          fk_data_atividade,
          fk_participante,
        },
      },
    });
  }

  async update(
    fk_data_atividade: number,
    fk_participante: number,
    data: DataAtividadeParticipanteDTO,
  ) {
    // Convert 'presenca' from boolean to number if defined
    const prismaData = {
      ...data,
      presenca: typeof data.presenca === 'boolean' ? (data.presenca ? 1 : 0) : data.presenca,
    };
    return this.prisma.data_atividade_participante.update({
      where: {
        fk_data_atividade_fk_participante: {
          fk_data_atividade,
          fk_participante,
        },
      },
      data: prismaData,
    });
  }

  async delete(fk_data_atividade: number, fk_participante: number) {
    return this.prisma.data_atividade_participante.delete({
      where: {
        fk_data_atividade_fk_participante: {
          fk_data_atividade,
          fk_participante,
        },
      },
    });
  }
}
