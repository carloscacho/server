import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
    IAtividadeRepository,
    CreateAtividadeData
} from '../../domain/repositories/atividade.repository.interface';
import { Atividade } from '../../domain/entities/atividade.entity';
import { DataAtividade, DataAtividadeProps } from '../../domain/entities/data-atividade.entity';

@Injectable()
export class PrismaAtividadeRepository implements IAtividadeRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: number): Promise<Atividade | null> {
        const data = await this.prisma.atividade.findUnique({
            where: { id_atividade: id },
            include: {
                palestrante_atividade: true,
            },
        });

        if (!data) return null;

        return Atividade.create(data.id_atividade, {
            nome: data.nome,
            tipo: data.tipo,
            descricao: data.descricao,
            observacao: data.observacao,
            limite: data.limite,
            fk_sala: data.fk_sala,
            fk_evento: data.fk_evento,
            fk_atividade_vinculada: data.fk_atividade_vinculada,
            palestrantes: data.palestrante_atividade.map(pa => pa.fk_palestrante),
        });
    }

    async findByIdWithSchedule(id: number): Promise<Atividade | null> {
        const data = await this.prisma.atividade.findUnique({
            where: { id_atividade: id },
            include: {
                palestrante_atividade: true,
                data_atividade: true,
            },
        });

        if (!data) return null;

        const schedule = data.data_atividade[0];

        return Atividade.create(data.id_atividade, {
            nome: data.nome,
            tipo: data.tipo,
            descricao: data.descricao,
            observacao: data.observacao,
            limite: data.limite,
            fk_sala: data.fk_sala,
            fk_evento: data.fk_evento,
            fk_atividade_vinculada: data.fk_atividade_vinculada,
            palestrantes: data.palestrante_atividade.map(pa => pa.fk_palestrante),
            dataAtividade: schedule
                ? DataAtividade.create(schedule.id_data_atividade, {
                    data: schedule.data,
                    hora: schedule.hora,
                    duracao: schedule.duracao,
                })
                : null,
        });
    }

    async create(data: CreateAtividadeData): Promise<Atividade> {
        const created = await this.prisma.atividade.create({
            data: {
                nome: data.nome,
                tipo: data.tipo,
                descricao: data.descricao,
                observacao: data.observacao,
                limite: data.limite,
                fk_sala: data.fk_sala,
                fk_evento: data.fk_evento,
                fk_atividade_vinculada: data.fk_atividade_vinculada,
                palestrante_atividade: data.palestrantes && data.palestrantes.length > 0
                    ? { create: data.palestrantes.map(id => ({ fk_palestrante: id })) }
                    : undefined,
                data_atividade: data.dataAtividade
                    ? {
                        create: {
                            data: data.dataAtividade.data,
                            hora: data.dataAtividade.hora,
                            duracao: data.dataAtividade.duracao,
                        },
                    }
                    : undefined,
            },
        });

        return Atividade.create(created.id_atividade, {
            nome: created.nome,
            tipo: created.tipo,
            descricao: created.descricao,
            observacao: created.observacao,
            limite: created.limite,
            fk_sala: created.fk_sala,
            fk_evento: created.fk_evento,
            fk_atividade_vinculada: created.fk_atividade_vinculada,
            palestrantes: data.palestrantes ?? [],
        });
    }

    async update(id: number, data: Partial<CreateAtividadeData>): Promise<Atividade> {
        const updated = await this.prisma.atividade.update({
            where: { id_atividade: id },
            data: {
                nome: data.nome,
                tipo: data.tipo,
                descricao: data.descricao,
                observacao: data.observacao,
                limite: data.limite,
                fk_sala: data.fk_sala,
                fk_evento: data.fk_evento,
                fk_atividade_vinculada: data.fk_atividade_vinculada,
            },
        });

        return Atividade.create(updated.id_atividade, {
            nome: updated.nome,
            tipo: updated.tipo,
            descricao: updated.descricao,
            observacao: updated.observacao,
            limite: updated.limite,
            fk_sala: updated.fk_sala,
            fk_evento: updated.fk_evento,
            fk_atividade_vinculada: updated.fk_atividade_vinculada,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.atividade.delete({
            where: { id_atividade: id },
        });
    }

    async ensureSpeakersLinkedToEvent(speakerIds: number[], eventId: number): Promise<void> {
        for (const speakerId of speakerIds) {
            const exists = await this.prisma.palestrante_evento.findUnique({
                where: {
                    fk_palestrante_fk_evento: {
                        fk_palestrante: speakerId,
                        fk_evento: eventId,
                    },
                },
            });

            if (!exists) {
                await this.prisma.palestrante_evento.create({
                    data: {
                        fk_palestrante: speakerId,
                        fk_evento: eventId,
                    },
                });
            }
        }
    }

    async syncSpeakers(activityId: number, speakerIds: number[]): Promise<void> {
        // Delete existing links
        await this.prisma.palestrante_atividade.deleteMany({
            where: { fk_atividade: activityId },
        });

        // Create new links
        if (speakerIds.length > 0) {
            await this.prisma.palestrante_atividade.createMany({
                data: speakerIds.map(id => ({
                    fk_atividade: activityId,
                    fk_palestrante: id,
                })),
            });
        }
    }

    async upsertSchedule(activityId: number, schedule: DataAtividadeProps): Promise<void> {
        const existing = await this.prisma.data_atividade.findFirst({
            where: { fk_atividade: activityId },
        });

        if (existing) {
            await this.prisma.data_atividade.update({
                where: { id_data_atividade: existing.id_data_atividade },
                data: {
                    data: schedule.data,
                    hora: schedule.hora,
                    duracao: schedule.duracao,
                },
            });
        } else {
            await this.prisma.data_atividade.create({
                data: {
                    fk_atividade: activityId,
                    data: schedule.data,
                    hora: schedule.hora,
                    duracao: schedule.duracao,
                },
            });
        }
    }

    async deleteWithCascade(id: number): Promise<void> {
        await this.prisma.$transaction(async (prisma) => {
            // 1. Get schedule IDs
            const schedules = await prisma.data_atividade.findMany({
                where: { fk_atividade: id },
                select: { id_data_atividade: true },
            });
            const scheduleIds = schedules.map(s => s.id_data_atividade);

            // 2. Delete participant registrations
            if (scheduleIds.length > 0) {
                await prisma.data_atividade_participante.deleteMany({
                    where: { fk_data_atividade: { in: scheduleIds } },
                });
            }

            // 3. Delete schedules
            await prisma.data_atividade.deleteMany({
                where: { fk_atividade: id },
            });

            // 4. Delete speaker links
            await prisma.palestrante_atividade.deleteMany({
                where: { fk_atividade: id },
            });

            // 5. Delete activity
            await prisma.atividade.delete({
                where: { id_atividade: id },
            });
        });
    }
}
