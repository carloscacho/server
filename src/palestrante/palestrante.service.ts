import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PalestranteDTO } from './dto/palestrante.dto';

@Injectable()
export class PalestranteService {
  constructor(private prisma: PrismaService) { }

  async create(data: PalestranteDTO, userId?: number, userRole?: number) {
    if (userRole === 4 && userId) {
      if (data.eventos && data.eventos.length > 0) {
        for (const evId of data.eventos) {
          const event = await this.prisma.evento.findUnique({ where: { id_evento: evId } });
          if (!event || event.fk_usuario_responsavel !== userId) {
            throw new ForbiddenException('Acesso negado: você não é o responsável por este evento.');
          }
        }
      }
    }
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

  async update(id_palestrante: number, data: PalestranteDTO, userId?: number, userRole?: number) {
    if (userRole === 4 && userId) {
      if (data.eventos && data.eventos.length > 0) {
        for (const evId of data.eventos) {
          const event = await this.prisma.evento.findUnique({ where: { id_evento: evId } });
          if (!event || event.fk_usuario_responsavel !== userId) {
            throw new ForbiddenException('Acesso negado: você não é o responsável por este evento.');
          }
        }
      }
    }
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

  async delete(id_palestrante: number, userId?: number, userRole?: number) {
    if (userRole === 4 && userId) {
      const links = await this.prisma.palestrante_evento.findMany({
        where: { fk_palestrante: id_palestrante }
      });
      for (const link of links) {
        const event = await this.prisma.evento.findUnique({ where: { id_evento: link.fk_evento } });
        if (!event || event.fk_usuario_responsavel !== userId) {
          throw new ForbiddenException('Acesso negado: você não é o responsável por um dos eventos deste palestrante.');
        }
      }
    }
    try {
      return await this.prisma.palestrante.delete({ where: { id_palestrante } });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Não é possível deletar este palestrante pois ele está vinculado a outros registros.');
      }
      throw error;
    }
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

  /**
   * Create multiple palestrantes in batch
   * Checks for existing email and links to event if already exists
   */
  async createBatch(palestrantes: PalestranteDTO[], fk_evento: number, userId?: number, userRole?: number) {
    if (userRole === 4 && userId) {
      const event = await this.prisma.evento.findUnique({ where: { id_evento: fk_evento } });
      if (!event || event.fk_usuario_responsavel !== userId) {
        throw new ForbiddenException('Acesso negado: você não é o responsável por este evento.');
      }
    }

    const results = {
      created: [] as any[],
      linked: [] as any[],
      errors: [] as { nome: string; email: string; error: string }[]
    };

    for (const palestrante of palestrantes) {
      try {
        // Add the event to the palestrante data
        const dataWithEvento = {
          ...palestrante,
          eventos: [fk_evento]
        };

        // Check if already exists
        const existing = await this.prisma.palestrante.findFirst({
          where: { email: palestrante.email }
        });

        if (existing) {
          // Link to event if not already linked
          const linkExists = await this.prisma.palestrante_evento.findFirst({
            where: {
              fk_palestrante: existing.id_palestrante,
              fk_evento: fk_evento
            }
          });

          if (!linkExists) {
            await this.prisma.palestrante_evento.create({
              data: {
                fk_palestrante: existing.id_palestrante,
                fk_evento: fk_evento
              }
            });
          }
          results.linked.push(existing);
        } else {
          // Create new palestrante
          const created = await this.create(dataWithEvento, userId, userRole);
          results.created.push(created);
        }
      } catch (error) {
        results.errors.push({
          nome: palestrante.nome,
          email: palestrante.email,
          error: error.message || 'Erro desconhecido'
        });
      }
    }

    return results;
  }
}
