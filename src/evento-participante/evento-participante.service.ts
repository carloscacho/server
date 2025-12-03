import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EventoParticipanteDTO } from './dto/evento-participante.dto';

@Injectable()
export class EventoParticipanteService {
  constructor(private prisma: PrismaService) { }

  async create(data: EventoParticipanteDTO) {
    // Use upsert to handle case where user is already subscribed
    return this.prisma.evento_participante.upsert({
      where: {
        fk_evento_fk_participante: {
          fk_evento: data.fk_evento,
          fk_participante: data.fk_participante,
        },
      },
      update: {}, // Don't update anything if it exists
      create: data, // Create if it doesn't exist
    });
  }

  async findAll() {
    return this.prisma.evento_participante.findMany();
  }

  async findById(fk_evento: number, fk_participante: number) {
    return this.prisma.evento_participante.findUnique({
      where: { fk_evento_fk_participante: { fk_evento, fk_participante } },
    });
  }

  async delete(fk_evento: number, fk_participante: number) {
    return this.prisma.evento_participante.delete({
      where: { fk_evento_fk_participante: { fk_evento, fk_participante } },
    });
  }
}
