import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { RecursoAtividadeDTO } from './dto/recurso-atividade.dto';

@Injectable()
export class RecursoAtividadeService {
  constructor(private prisma: PrismaService) {}

  async create(data: RecursoAtividadeDTO) {
    if (!data.url_arquivo) {
      throw new BadRequestException('A URL do arquivo é obrigatória.');
    }
    return this.prisma.recurso_atividade.create({ 
      data: {
        nome: data.nome,
        tipo_envio: data.tipo_envio,
        formato: data.formato || null,
        url_arquivo: data.url_arquivo,
        fk_atividade: Number(data.fk_atividade)
      } 
    });
  }

  async findByAtividadeAdmin(id_atividade: number) {
    return this.prisma.recurso_atividade.findMany({
      where: { fk_atividade: id_atividade },
    });
  }

  async findByAtividadeParticipante(id_atividade: number, id_usuario: number) {
    const atividade = await this.prisma.atividade.findUnique({
      where: { id_atividade },
      include: {
        evento: {
          include: {
            evento_participante: {
              where: {
                participante: { fk_usuario: id_usuario },
              },
            },
          },
        },
      },
    });

    if (!atividade) {
      throw new NotFoundException('Atividade não encontrada.');
    }

    if (atividade.evento.evento_participante.length === 0) {
      throw new ForbiddenException('Acesso negado: Você precisa estar inscrito no evento para visualizar os recursos desta atividade.');
    }

    return this.prisma.recurso_atividade.findMany({
      where: { fk_atividade: id_atividade },
    });
  }

  async delete(id_recurso: number) {
    const recurso = await this.prisma.recurso_atividade.findUnique({
      where: { id_recurso },
    });
    if (!recurso) throw new NotFoundException('Recurso não encontrado');
    return this.prisma.recurso_atividade.delete({
      where: { id_recurso },
    });
  }
}
