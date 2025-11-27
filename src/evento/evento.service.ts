import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EventoDTO } from './dto/evento.dto';

@Injectable()
export class EventoService {
  constructor(private prisma: PrismaService) { }

  async create(data: EventoDTO) {
    // Map DTO fields to Prisma model fields
    const { ano, id_evento, data_inicio, data_fim, ...rest } = data;
    return this.prisma.evento.create({
      data: {
        ...rest,
        inicio: data_inicio,
        final: data_fim,
        ano,
      },
    });
  }

  async findAll() {
    return this.prisma.evento.findMany();
  }

  async findById(id_evento: number) {
    return this.prisma.evento.findUnique({ where: { id_evento } });
  }

  async update(id_evento: number, data: EventoDTO) {
    return this.prisma.evento.update({ where: { id_evento }, data });
  }

  async delete(id_evento: number) {
    return this.prisma.evento.delete({ where: { id_evento } });
  }
}
