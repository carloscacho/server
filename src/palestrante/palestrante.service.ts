import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PalestranteDTO } from './dto/palestrante.dto';

@Injectable()
export class PalestranteService {
  constructor(private prisma: PrismaService) { }

  async create(data: PalestranteDTO) {
    const { eventos, ...rest } = data;

    // Check if palestrante with this email already exists
    const existingPalestrante = await this.prisma.palestrante.findFirst({
      where: { email: rest.email },
    });

    if (existingPalestrante) {
      // If exists, just link to the new events
      if (eventos && eventos.length > 0) {
        // Check which events are not yet linked
        const existingLinks = await this.prisma.palestrante_evento.findMany({
          where: {
            fk_palestrante: existingPalestrante.id_palestrante,
            fk_evento: { in: eventos },
          },
        });

        const linkedEventIds = existingLinks.map((link) => link.fk_evento);
        const newEventIds = eventos.filter((id) => !linkedEventIds.includes(id));

        if (newEventIds.length > 0) {
          await this.prisma.palestrante_evento.createMany({
            data: newEventIds.map((id) => ({
              fk_palestrante: existingPalestrante.id_palestrante,
              fk_evento: id,
            })),
          });
        }
      }
      return existingPalestrante;
    }

    // If not exists, create new
    return this.prisma.palestrante.create({
      data: {
        ...rest,
        palestrante_evento: {
          create: eventos?.map((id) => ({
            evento: { connect: { id_evento: id } },
          })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.palestrante.findMany({
      include: {
        palestrante_evento: {
          include: {
            evento: true,
          },
        },
      },
    });
  }

  async findById(id_palestrante: number) {
    return this.prisma.palestrante.findUnique({
      where: { id_palestrante },
      include: {
        palestrante_evento: {
          include: {
            evento: true,
          },
        },
      },
    });
  }

  async update(id_palestrante: number, data: PalestranteDTO) {
    const { eventos, ...rest } = data;

    // First, delete existing relations if updating events
    if (eventos) {
      await this.prisma.palestrante_evento.deleteMany({
        where: { fk_palestrante: id_palestrante },
      });
    }

    return this.prisma.palestrante.update({
      where: { id_palestrante },
      data: {
        ...rest,
        palestrante_evento: {
          create: eventos?.map((id) => ({
            evento: { connect: { id_evento: id } },
          })),
        },
      },
    });
  }

  async delete(id_palestrante: number) {
    return this.prisma.palestrante.delete({ where: { id_palestrante } });
  }

  async findByEventoId(id_evento: number) {
    return this.prisma.palestrante.findMany({
      where: {
        palestrante_evento: {
          some: {
            fk_evento: id_evento,
          },
        },
      },
      include: {
        palestrante_evento: {
          include: {
            evento: true,
          },
        },
      },
    });
  }
}
