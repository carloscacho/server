import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AtividadeDTO } from './dto/atividade.dto';

@Injectable()
export class AtividadeService {
  constructor(private prisma: PrismaService) { }

  async create(data: AtividadeDTO) {
    return this.prisma.atividade.create({ data });
  }

  async findAll() {
    return this.prisma.atividade.findMany();
  }

 async findAllFullInfosById(id_evento: number) {
  return this.prisma.atividade.findMany({
    where: {
      fk_evento: {
        equals: id_evento
      }
    },
    include: {
      sala: true,          // inclui dados da sala
      palestrante_atividade: {
        include: {
          palestrante: true // inclui informações do palestrante
        }
      }
    },
    orderBy: {
      id_atividade: 'desc'
    }
  });
}

 async findAllFullInfos() {
  return this.prisma.atividade.findMany({
    include: {
      sala: true,          // inclui dados da sala
      palestrante_atividade: {
        include: {
          palestrante: true // inclui informações do palestrante
        }
      }
    },
    orderBy: {
      id_atividade: 'desc'
    }
  });
}

  async findById(id_atividade: number) {
    return this.prisma.atividade.findUnique({ where: { id_atividade } });
  }

  async update(id_atividade: number, data: AtividadeDTO) {
    return this.prisma.atividade.update({ where: { id_atividade }, data });
  }

  async delete(id_atividade: number) {
    return this.prisma.atividade.delete({ where: { id_atividade } });
  }
}
