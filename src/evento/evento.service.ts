import { Injectable, BadRequestException } from '@nestjs/common';
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
    return this.prisma.evento.findMany({
      include: {
        usuario_responsavel: true
      }
    });
  }

  async findById(id_evento: number) {
    return this.prisma.evento.findUnique({
      where: { id_evento },
      include: {
        usuario_responsavel: true
      }
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.evento.findFirst({
      where: { slug },
      include: {
        _count: {
          select: { atividade: true }
        },
        usuario_responsavel: true
      }
    });
  }

  async update(id_evento: number, data: EventoDTO) {
    const { ano, id_evento: id, data_inicio, data_fim, ...rest } = data;
    return this.prisma.evento.update({
      where: { id_evento },
      data: {
        ...rest,
        inicio: data_inicio,
        final: data_fim,
        ano,
      },
    });
  }

  async delete(id_evento: number) {
    try {
      return await this.prisma.evento.delete({ where: { id_evento } });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Não é possível deletar este evento pois ele está vinculado a outros registros.');
      }
      throw error;
    }
  }
}
