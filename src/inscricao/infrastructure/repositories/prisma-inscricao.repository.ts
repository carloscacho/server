import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
    IInscricaoRepository,
    InscricaoData,
    LinkedActivityInfo
} from '../../domain/repositories/inscricao.repository.interface';

@Injectable()
export class PrismaInscricaoRepository implements IInscricaoRepository {
    constructor(private readonly prisma: PrismaService) { }

    async exists(fk_data_atividade: number, fk_participante: number): Promise<boolean> {
        const record = await this.prisma.data_atividade_participante.findUnique({
            where: {
                fk_data_atividade_fk_participante: {
                    fk_data_atividade,
                    fk_participante,
                },
            },
        });
        return record !== null;
    }

    async create(data: InscricaoData): Promise<void> {
        await this.prisma.data_atividade_participante.create({
            data: {
                fk_data_atividade: data.fk_data_atividade,
                fk_participante: data.fk_participante,
                presenca: data.presenca ?? 0,
            },
        });
    }

    async delete(fk_data_atividade: number, fk_participante: number): Promise<void> {
        // Idempotent deletion using deleteMany
        await this.prisma.data_atividade_participante.deleteMany({
            where: {
                fk_data_atividade,
                fk_participante,
            },
        });
    }

    async getLinkedActivitySession(fk_data_atividade: number): Promise<LinkedActivityInfo | null> {
        const session = await this.prisma.data_atividade.findUnique({
            where: { id_data_atividade: fk_data_atividade },
            include: { atividade: true },
        });

        if (!session) return null;

        return {
            id_data_atividade: session.id_data_atividade,
            fk_atividade_vinculada: session.atividade?.fk_atividade_vinculada ?? null,
        };
    }

    async findSessionByLinkedActivityId(fk_atividade: number): Promise<{ id_data_atividade: number } | null> {
        const session = await this.prisma.data_atividade.findFirst({
            where: { fk_atividade },
            select: { id_data_atividade: true },
        });

        return session;
    }
}
