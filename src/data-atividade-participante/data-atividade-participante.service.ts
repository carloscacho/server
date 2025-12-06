import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DataAtividadeParticipanteDTO } from './dto/data-atividade-participante.dto';

@Injectable()
export class DataAtividadeParticipanteService {
  constructor(private prisma: PrismaService) { }

  async create(data: DataAtividadeParticipanteDTO) {
    try {
      // Convert 'presenca' from boolean to number if defined
      const prismaData = {
        ...data,
        presenca: typeof data.presenca === 'boolean' ? (data.presenca ? 1 : 0) : data.presenca,
      };
      const created = await this.prisma.data_atividade_participante.create({ data: prismaData });

      // Auto-subscribe to linked activity
      try {
        const session = await this.prisma.data_atividade.findUnique({
          where: { id_data_atividade: data.fk_data_atividade },
          include: { atividade: true }
        });

        if (session?.atividade?.fk_atividade_vinculada) {
          const linkedSession = await this.prisma.data_atividade.findFirst({
            where: { fk_atividade: session.atividade.fk_atividade_vinculada }
          });

          if (linkedSession) {
            const exists = await this.prisma.data_atividade_participante.findUnique({
              where: {
                fk_data_atividade_fk_participante: {
                  fk_data_atividade: linkedSession.id_data_atividade,
                  fk_participante: data.fk_participante
                }
              }
            });

            if (!exists) {
              await this.prisma.data_atividade_participante.create({
                data: {
                  fk_data_atividade: linkedSession.id_data_atividade,
                  fk_participante: data.fk_participante,
                  presenca: 0
                }
              });
            }
          }
        }
      } catch (error) {
        console.error("Error auto-subscribing to linked activity:", error);
      }

      return created;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Participante já inscrito nesta atividade.');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException('Atividade ou Participante não encontrados.');
      }
      console.error('Error creating data_atividade_participante:', error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.data_atividade_participante.findMany();
  }

  async findById(fk_data_atividade: number, fk_participante: number) {
    if (isNaN(fk_data_atividade) || isNaN(fk_participante)) {
      throw new BadRequestException('Invalid ID provided');
    }
    return this.prisma.data_atividade_participante.findUnique({
      where: {
        fk_data_atividade_fk_participante: {
          fk_data_atividade,
          fk_participante,
        },
      },
    });
  }

  async findByParticipante(fk_participante: number) {
    try {
      return await this.prisma.data_atividade_participante.findMany({
        where: {
          fk_participante,
        },
        include: {
          data_atividade: {
            include: {
              atividade: {
                include: {
                  sala: true
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error in findByParticipante:', error);
      throw error;
    }
  }

  async update(
    fk_data_atividade: number,
    fk_participante: number,
    data: DataAtividadeParticipanteDTO,
  ) {
    // Convert 'presenca' from boolean to number if defined
    const prismaData = {
      ...data,
      presenca: typeof data.presenca === 'boolean' ? (data.presenca ? 1 : 0) : data.presenca,
    };
    return this.prisma.data_atividade_participante.update({
      where: {
        fk_data_atividade_fk_participante: {
          fk_data_atividade,
          fk_participante,
        },
      },
      data: prismaData,
    });
  }

  async delete(fk_data_atividade: number, fk_participante: number) {
    // Using deleteMany to avoid P2025 if record doesn't exist (idempotent)
    return this.prisma.data_atividade_participante.deleteMany({
      where: {
        fk_data_atividade,
        fk_participante,
      },
    });
  }
}
