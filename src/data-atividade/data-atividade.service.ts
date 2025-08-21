import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DataAtividadeDTO } from './dto/data-atividade.dto';

@Injectable()
export class DataAtividadeService {
  constructor(private prisma: PrismaService) {}

  async create(data: DataAtividadeDTO) {
    return this.prisma.data_atividade.create({ data });
  }

  async findAll() {
    return this.prisma.data_atividade.findMany();
  }

  async findById(id_data_atividade: number) {
    return this.prisma.data_atividade.findUnique({ where: { id_data_atividade } });
  }

  async update(id_data_atividade: number, data: DataAtividadeDTO) {
    return this.prisma.data_atividade.update({ where: { id_data_atividade }, data });
  }

  async delete(id_data_atividade: number) {
    return this.prisma.data_atividade.delete({ where: { id_data_atividade } });
  }
}