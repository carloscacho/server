import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EventoParticipanteDTO } from './dto/evento-participante.dto';

@Injectable()
export class EventoParticipanteService {
  constructor(private prisma: PrismaService) { }

  async create(data: EventoParticipanteDTO) {
    // Use upsert to handle case where user is already subscribed
    const registration = await this.prisma.evento_participante.upsert({
      where: {
        fk_evento_fk_participante: {
          fk_evento: data.fk_evento,
          fk_participante: data.fk_participante,
        },
      },
      update: {}, // Don't update anything if it exists
      create: data, // Create if it doesn't exist
    });

    // Auto subscribe to all sub-events
    const subEvents = await this.prisma.evento.findMany({
      where: { fk_evento_pai: data.fk_evento }
    });
    for (const sub of subEvents) {
      try {
        await this.prisma.evento_participante.upsert({
          where: {
            fk_evento_fk_participante: {
              fk_evento: sub.id_evento,
              fk_participante: data.fk_participante
            }
          },
          update: {},
          create: {
            fk_evento: sub.id_evento,
            fk_participante: data.fk_participante
          }
        });
      } catch (e) {
        // Ignore potential unique key or relation error on auto sync
      }
    }

    return registration;
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
