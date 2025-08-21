import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PalestranteDTO } from './dto/palestrante.dto';

@Injectable()
export class PalestranteService {
  constructor(private prisma: PrismaService) {}

  async create(data: PalestranteDTO) {
    return this.prisma.palestrante.create({ data });
  }

  async findAll() {
    return this.prisma.palestrante.findMany();
  }

  async findById(id_palestrante: number) {
    return this.prisma.palestrante.findUnique({ where: { id_palestrante } });
  }

  async update(id_palestrante: number, data: PalestranteDTO) {
    return this.prisma.palestrante.update({ where: { id_palestrante }, data });
  }

  async delete(id_palestrante: number) {
    return this.prisma.palestrante.delete({ where: { id_palestrante } });
  }
}