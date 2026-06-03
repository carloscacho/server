import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EventoDTO } from './dto/evento.dto';

@Injectable()
export class EventoService {
  constructor(private prisma: PrismaService) { }

  async create(data: EventoDTO) {
    // Map DTO fields to Prisma model fields
    const { ano, id_evento, data_inicio, data_fim, ...rest } = data;
    const created = await this.prisma.evento.create({
      data: {
        ...rest,
        inicio: data_inicio,
        final: data_fim,
        ano,
      },
    });

    // Auto-promote responsible user to tipo=4 (Responsável)
    if (created.fk_usuario_responsavel) {
      await this.promoteToResponsavel(created.fk_usuario_responsavel);
    }

    return created;
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
        usuario_responsavel: true,
        eventos_filhos: {
          include: {
            atividade: {
              include: {
                data_atividade: true,
                sala: true,
                palestrante_atividade: {
                  include: { palestrante: true }
                }
              }
            }
          }
        }
      }
    });
  }

  async update(id_evento: number, data: EventoDTO) {
    const oldEvent = await this.prisma.evento.findUnique({ where: { id_evento } });

    const { ano, id_evento: id, data_inicio, data_fim, ...rest } = data;
    const updatedEvent = await this.prisma.evento.update({
      where: { id_evento },
      data: {
        ...rest,
        inicio: data_inicio,
        final: data_fim,
        ano,
      },
    });

    if (oldEvent && oldEvent.fk_evento_pai !== updatedEvent.fk_evento_pai) {
      // 1. Remove registrations from old parent's participants
      if (oldEvent.fk_evento_pai) {
        const oldParentParticipants = await this.prisma.evento_participante.findMany({
          where: { fk_evento: oldEvent.fk_evento_pai }
        });
        const oldParentParticipantsIds = oldParentParticipants.map(p => p.fk_participante);
        if (oldParentParticipantsIds.length > 0) {
          await this.prisma.evento_participante.deleteMany({
            where: {
              fk_evento: id_evento,
              fk_participante: { in: oldParentParticipantsIds }
            }
          });
        }
      }

      // 2. Add registrations for new parent's participants
      if (updatedEvent.fk_evento_pai) {
        const newParentParticipants = await this.prisma.evento_participante.findMany({
          where: { fk_evento: updatedEvent.fk_evento_pai }
        });
        for (const p of newParentParticipants) {
          try {
            await this.prisma.evento_participante.upsert({
              where: {
                fk_evento_fk_participante: {
                  fk_evento: id_evento,
                  fk_participante: p.fk_participante
                }
              },
              update: {},
              create: {
                fk_evento: id_evento,
                fk_participante: p.fk_participante
              }
            });
          } catch (e) {
            // Ignore potential unique key or relation error on sync
          }
        }
      }
    }

    // Auto-promote responsible user to tipo=4 (Responsável)
    if (updatedEvent.fk_usuario_responsavel) {
      await this.promoteToResponsavel(updatedEvent.fk_usuario_responsavel);
    }

    // If responsible user was removed, check if they're still responsible for other events
    if (oldEvent && oldEvent.fk_usuario_responsavel && oldEvent.fk_usuario_responsavel !== updatedEvent.fk_usuario_responsavel) {
      await this.demoteIfNoLongerResponsavel(oldEvent.fk_usuario_responsavel);
    }

    return updatedEvent;
  }

  /**
   * Promote a user to tipo=4 (Responsável) if they are currently tipo=2 (Comum) ou tipo=3 (Auxiliar)
   */
  private async promoteToResponsavel(userId: number) {
    const user = await this.prisma.usuario.findUnique({ where: { id_usuario: userId } });
    if (user && user.tipo !== 1 && user.tipo !== 4) {
      await this.prisma.usuario.update({
        where: { id_usuario: userId },
        data: { tipo: 4 }
      });
    }
  }

  /**
   * Demote a user from tipo=4 back to tipo=2 if they are no longer responsible for any event
   */
  private async demoteIfNoLongerResponsavel(userId: number) {
    const user = await this.prisma.usuario.findUnique({ where: { id_usuario: userId } });
    if (user && user.tipo === 4) {
      const stillResponsible = await this.prisma.evento.findFirst({
        where: { fk_usuario_responsavel: userId }
      });
      if (!stillResponsible) {
        await this.prisma.usuario.update({
          where: { id_usuario: userId },
          data: { tipo: 2 }
        });
      }
    }
  }

  async getReportData(id_evento: number, userId: number, userRole: number) {
    const evento = await this.prisma.evento.findUnique({
      where: { id_evento },
      include: {
        usuario_responsavel: true,
      },
    });

    if (!evento) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (userRole === 4 && evento.fk_usuario_responsavel !== userId) {
      throw new ForbiddenException('Acesso negado: você não é o responsável por este evento.');
    }

    const atividades = await this.prisma.atividade.findMany({
      where: { fk_evento: id_evento },
      include: {
        sala: true,
        data_atividade: {
          include: {
            data_atividade_participante: {
              include: {
                participante: {
                  include: {
                    usuario: {
                      select: {
                        nome: true,
                        email: true,
                        vinculo: true,
                      },
                    },
                    turma: true,
                    participante_turma: {
                      include: {
                        turma: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const totalInscritosEvento = await this.prisma.evento_participante.count({
      where: { fk_evento: id_evento },
    });

    return {
      evento: {
        id_evento: evento.id_evento,
        nome: evento.nome,
        inicio: evento.inicio,
        final: evento.final,
        responsavel: evento.usuario_responsavel?.nome || 'Não definido',
        totalInscritos: totalInscritosEvento,
      },
      atividades: atividades.map((ativ) => {
        const participacoes: any[] = [];
        ativ.data_atividade.forEach((da) => {
          da.data_atividade_participante.forEach((dap) => {
            const part = dap.participante;
            if (part && part.usuario) {
              let turmas: string[] = [];
              if (part.usuario.vinculo === 1 && part.turma) {
                turmas = [part.turma.nome];
              } else if (part.usuario.vinculo === 2 && part.participante_turma) {
                turmas = part.participante_turma.map((pt) => pt.turma.nome);
              }

              participacoes.push({
                fk_participante: dap.fk_participante,
                nome: part.usuario.nome,
                email: part.usuario.email,
                vinculo: part.usuario.vinculo,
                turmas,
                semestre: part.semestre,
                presenca: dap.presenca,
                data_hora: dap.data_hora,
              });
            }
          });
        });

        const uniquePartsMap = new Map<number, any>();
        participacoes.forEach((p) => {
          if (!uniquePartsMap.has(p.fk_participante)) {
            uniquePartsMap.set(p.fk_participante, p);
          } else {
            const existing = uniquePartsMap.get(p.fk_participante);
            if (p.presenca === 1) {
              existing.presenca = 1;
            }
          }
        });
        const uniqueParticipacoes = Array.from(uniquePartsMap.values());

        return {
          id_atividade: ativ.id_atividade,
          nome: ativ.nome,
          sala: ativ.sala?.nome || 'Não definida',
          limite: ativ.limite,
          totalInscritos: uniqueParticipacoes.length,
          totalPresentes: uniqueParticipacoes.filter((p) => p.presenca === 1).length,
          participantes: uniqueParticipacoes,
        };
      }),
    };
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
