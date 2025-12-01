import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DataAtividadeParticipanteDTO } from './dto/data-atividade-participante.dto';

@Injectable()
export class DataAtividadeParticipanteService {
  constructor(private prisma: PrismaService) { }

  async create(data: DataAtividadeParticipanteDTO) {
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
  }

  async findAll() {
    return this.prisma.data_atividade_participante.findMany();
  }

  async findById(fk_data_atividade: number, fk_participante: number) {
    return this.prisma.data_atividade_participante.findUnique({
      where: {
        fk_data_atividade_fk_participante: {
          fk_data_atividade,
          fk_participante,
        },
      },
    });
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
    return this.prisma.data_atividade_participante.delete({
      where: {
        fk_data_atividade_fk_participante: {
          fk_data_atividade,
          fk_participante,
        },
      },
    });
  }
}
