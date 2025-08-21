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

  async findById(fk_palestrante: number, fk_atividade: number) {
    return this.prisma.palestrante_atividade.findUnique({
      where: { fk_palestrante_fk_atividade: { fk_palestrante, fk_atividade } },
    });
  }

  async delete(fk_palestrante: number, fk_atividade: number) {
    return this.prisma.palestrante_atividade.delete({
      where: { fk_palestrante_fk_atividade: { fk_palestrante, fk_atividade } },
    });
  }
}