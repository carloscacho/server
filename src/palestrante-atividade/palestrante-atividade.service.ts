import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PalestranteAtividadeDTO } from './dto/palestrante-atividade.dto';

@Injectable()
export class PalestranteAtividadeService {
  constructor(private prisma: PrismaService) {}

  async create(data: PalestranteAtividadeDTO) {
    return this.prisma.palestrante_atividade.create({ data });
  }

  async findAll() {
    return this.prisma.palestrante_atividade.findMany();
  }

  async findById(fk_atividade: number, fk_palestrante: number) {
    return this.prisma.palestrante_atividade.findUnique({
      where: { fk_atividade_fk_palestrante: { fk_atividade, fk_palestrante } },
    });
  }

  async delete(fk_atividade: number, fk_palestrante: number) {
    return this.prisma.palestrante_atividade.delete({
      where: { fk_atividade_fk_palestrante: { fk_atividade, fk_palestrante } },
    });
  }
}
