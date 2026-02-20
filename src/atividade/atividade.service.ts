import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AtividadeDTO } from './dto/atividade.dto';

@Injectable()
export class AtividadeService {
  constructor(private prisma: PrismaService) { }

  async create(data: AtividadeDTO) {
    const { palestrantes, data_atividade, ...rest } = data;

    // Ensure all speakers are linked to the event
    if (palestrantes && palestrantes.length > 0) {
      for (const idPalestrante of palestrantes) {
        const linkExists = await this.prisma.palestrante_evento.findUnique({
          where: {
            fk_palestrante_fk_evento: {
              fk_palestrante: idPalestrante,
              fk_evento: data.fk_evento
            }
          }
        });

        if (!linkExists) {
          await this.prisma.palestrante_evento.create({
            data: {
              fk_palestrante: idPalestrante,
              fk_evento: data.fk_evento
            }
          });
        }
      }
    }

    // Helper to safely parse time string to Date
    const parseTimeToDate = (timeStr: string | null | undefined): Date | undefined => {
      if (!timeStr) return undefined;
      // Validate format HH:MM
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
      if (!timeRegex.test(timeStr)) return undefined;
      const date = new Date(`1970-01-01T${timeStr}:00.000Z`);
      return isNaN(date.getTime()) ? undefined : date;
    };

    // Build data_atividade only if hora is valid
    let dataAtividadeCreate: { create: { data: Date; hora: Date; duracao?: Date } } | undefined = undefined;
    if (data_atividade && data_atividade.hora) {
      const horaDate = parseTimeToDate(data_atividade.hora);
      if (horaDate) {
        dataAtividadeCreate = {
          create: {
            data: new Date(data_atividade.data),
            hora: horaDate,
            duracao: parseTimeToDate(data_atividade.duracao)
          }
        };
      }
    }

    return this.prisma.atividade.create({
      data: {
        ...rest,
        palestrante_atividade: palestrantes && palestrantes.length > 0 ? {
          create: palestrantes.map(id => ({ fk_palestrante: id }))
        } : undefined,
        data_atividade: dataAtividadeCreate
      }
    });
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
        },
        data_atividade: {
          include: {
            _count: {
              select: { data_atividade_participante: true }
            }
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
        },
        data_atividade: {
          include: {
            _count: {
              select: { data_atividade_participante: true }
            }
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
    const { palestrantes, data_atividade, ...rest } = data;

    // 1. Ensure all speakers are linked to the event
    if (palestrantes && palestrantes.length > 0) {
      for (const idPalestrante of palestrantes) {
        const linkExists = await this.prisma.palestrante_evento.findUnique({
          where: {
            fk_palestrante_fk_evento: {
              fk_palestrante: idPalestrante,
              fk_evento: data.fk_evento
            }
          }
        });

        if (!linkExists) {
          await this.prisma.palestrante_evento.create({
            data: {
              fk_palestrante: idPalestrante,
              fk_evento: data.fk_evento
            }
          });
        }
      }
    }

    // 2. Update activity and its relationships
    return this.prisma.$transaction(async (prisma) => {
      // Update basic fields
      await prisma.atividade.update({
        where: { id_atividade },
        data: rest
      });

      // Update palestrantes if provided
      if (palestrantes) {
        // Remove existing links
        await prisma.palestrante_atividade.deleteMany({
          where: { fk_atividade: id_atividade }
        });

        // Create new links
        if (palestrantes.length > 0) {
          await prisma.palestrante_atividade.createMany({
            data: palestrantes.map(id => ({
              fk_atividade: id_atividade,
              fk_palestrante: id
            }))
          });
        }
      }

      // Update data_atividade if provided
      if (data_atividade) {
        // Check if data_atividade exists for this activity
        const existingData = await prisma.data_atividade.findFirst({
          where: { fk_atividade: id_atividade }
        });

        if (existingData) {
          await prisma.data_atividade.update({
            where: { id_data_atividade: existingData.id_data_atividade },
            data: {
              data: new Date(data_atividade.data),
              hora: new Date(`1970-01-01T${data_atividade.hora}:00.000Z`),
              duracao: data_atividade.duracao ? new Date(`1970-01-01T${data_atividade.duracao}:00.000Z`) : undefined
            }
          });
        } else {
          await prisma.data_atividade.create({
            data: {
              fk_atividade: id_atividade,
              data: new Date(data_atividade.data),
              hora: new Date(`1970-01-01T${data_atividade.hora}:00.000Z`),
              duracao: data_atividade.duracao ? new Date(`1970-01-01T${data_atividade.duracao}:00.000Z`) : undefined
            }
          });
        }
      }

      return prisma.atividade.findUnique({ where: { id_atividade } });
    });
  }

  async delete(id_atividade: number) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Get IDs of data_atividade related to this activity
      const dataAtividades = await prisma.data_atividade.findMany({
        where: { fk_atividade: id_atividade },
        select: { id_data_atividade: true }
      });
      const dataAtividadeIds = dataAtividades.map(da => da.id_data_atividade);

      // 2. Delete participants related to these data_atividade
      if (dataAtividadeIds.length > 0) {
        await prisma.data_atividade_participante.deleteMany({
          where: { fk_data_atividade: { in: dataAtividadeIds } }
        });
      }

      // 3. Delete related data_atividade
      await prisma.data_atividade.deleteMany({
        where: { fk_atividade: id_atividade }
      });

      // 4. Delete related palestrante_atividade
      await prisma.palestrante_atividade.deleteMany({
        where: { fk_atividade: id_atividade }
      });

      // 5. Finally delete the atividade
      return prisma.atividade.delete({
        where: { id_atividade }
      });
    });
  }
  async findByIdWithParticipants(id_atividade: number) {
    return this.prisma.atividade.findUnique({
      where: { id_atividade },
      include: {
        sala: true,
        data_atividade: {
          include: {
            data_atividade_participante: {
              include: {
                participante: {
                  include: {
                    usuario: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  /**
   * Create multiple activities in batch
   * Returns success and error arrays for reporting
   */
  async createBatch(atividades: AtividadeDTO[]) {
    const results = {
      success: [] as any[],
      errors: [] as { nome: string; error: string }[]
    };

    for (const atividade of atividades) {
      try {
        const created = await this.create(atividade);
        results.success.push(created);
      } catch (error) {
        results.errors.push({
          nome: atividade.nome,
          error: error.message || 'Erro desconhecido'
        });
      }
    }

    return results;
  }

  /**
   * Enroll participants by email into all sessions of an activity.
   * For each email: find user → find participante → create data_atividade_participante for each session.
   */
  async inscreverParticipantesPorEmail(id_atividade: number, emails: string[]) {
    const results = {
      success: [] as { email: string; nome: string }[],
      errors: [] as { email: string; error: string }[],
    };

    // Get all sessions for this activity
    const sessions = await this.prisma.data_atividade.findMany({
      where: { fk_atividade: id_atividade },
      select: { id_data_atividade: true },
    });

    if (sessions.length === 0) {
      throw new Error('Atividade não possui sessões cadastradas.');
    }

    for (const email of emails) {
      try {
        const trimmedEmail = email.trim().toLowerCase();
        if (!trimmedEmail) continue;

        // 1. Find user by email
        const usuario = await this.prisma.usuario.findUnique({
          where: { email: trimmedEmail },
        });

        if (!usuario) {
          results.errors.push({ email: trimmedEmail, error: 'Usuário não encontrado' });
          continue;
        }

        // 2. Find participante record
        const participante = await this.prisma.participante.findFirst({
          where: { fk_usuario: usuario.id_usuario },
        });

        if (!participante) {
          results.errors.push({ email: trimmedEmail, error: 'Registro de participante não encontrado' });
          continue;
        }

        // 3. Enroll in all sessions
        let enrolled = false;
        for (const session of sessions) {
          const exists = await this.prisma.data_atividade_participante.findUnique({
            where: {
              fk_data_atividade_fk_participante: {
                fk_data_atividade: session.id_data_atividade,
                fk_participante: participante.id_participante,
              },
            },
          });

          if (!exists) {
            await this.prisma.data_atividade_participante.create({
              data: {
                fk_data_atividade: session.id_data_atividade,
                fk_participante: participante.id_participante,
              },
            });
            enrolled = true;
          }
        }

        if (enrolled) {
          results.success.push({ email: trimmedEmail, nome: usuario.nome });
        } else {
          results.errors.push({ email: trimmedEmail, error: 'Já inscrito em todas as sessões' });
        }
      } catch (error) {
        results.errors.push({ email, error: error.message || 'Erro desconhecido' });
      }
    }

    return results;
  }
}
