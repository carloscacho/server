import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
    IPalestranteRepository,
    CreatePalestranteData
} from '../../domain/repositories/palestrante.repository.interface';
import { Palestrante } from '../../domain/entities/palestrante.entity';

@Injectable()
export class PrismaPalestranteRepository implements IPalestranteRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: number): Promise<Palestrante | null> {
        const data = await this.prisma.palestrante.findUnique({
            where: { id_palestrante: id },
            include: { palestrante_evento: true },
        });

        if (!data) return null;

        return Palestrante.create(data.id_palestrante, {
            nome: data.nome,
            email: data.email,
            instituicao: data.instituicao,
            foto: data.foto,
            eventos: data.palestrante_evento.map(pe => pe.fk_evento),
        });
    }

    async findByEmail(email: string): Promise<Palestrante | null> {
        const data = await this.prisma.palestrante.findFirst({
            where: { email },
            include: { palestrante_evento: true },
        });

        if (!data) return null;

        return Palestrante.create(data.id_palestrante, {
            nome: data.nome,
            email: data.email,
            instituicao: data.instituicao,
            foto: data.foto,
            eventos: data.palestrante_evento.map(pe => pe.fk_evento),
        });
    }

    async create(data: CreatePalestranteData): Promise<Palestrante> {
        const created = await this.prisma.palestrante.create({
            data: {
                nome: data.nome,
                email: data.email,
                instituicao: data.instituicao,
                foto: data.foto,
                palestrante_evento: data.eventos && data.eventos.length > 0
                    ? {
                        create: data.eventos.map(id => ({
                            evento: { connect: { id_evento: id } },
                        })),
                    }
                    : undefined,
            },
        });

        return Palestrante.create(created.id_palestrante, {
            nome: created.nome,
            email: created.email,
            instituicao: created.instituicao,
            foto: created.foto,
            eventos: data.eventos ?? [],
        });
    }

    async update(id: number, data: Partial<CreatePalestranteData>): Promise<Palestrante> {
        const updated = await this.prisma.palestrante.update({
            where: { id_palestrante: id },
            data: {
                nome: data.nome,
                email: data.email,
                instituicao: data.instituicao,
                foto: data.foto,
            },
        });

        return Palestrante.create(updated.id_palestrante, {
            nome: updated.nome,
            email: updated.email,
            instituicao: updated.instituicao,
            foto: updated.foto,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.palestrante.delete({
            where: { id_palestrante: id },
        });
    }

    async linkToEvents(palestranteId: number, eventIds: number[]): Promise<void> {
        await this.prisma.palestrante_evento.createMany({
            data: eventIds.map(id => ({
                fk_palestrante: palestranteId,
                fk_evento: id,
            })),
        });
    }

    async syncEventLinks(palestranteId: number, eventIds: number[]): Promise<void> {
        // Delete existing links
        await this.prisma.palestrante_evento.deleteMany({
            where: { fk_palestrante: palestranteId },
        });

        // Create new links
        if (eventIds.length > 0) {
            await this.prisma.palestrante_evento.createMany({
                data: eventIds.map(id => ({
                    fk_palestrante: palestranteId,
                    fk_evento: id,
                })),
            });
        }
    }

    async getLinkedEventIds(palestranteId: number): Promise<number[]> {
        const links = await this.prisma.palestrante_evento.findMany({
            where: { fk_palestrante: palestranteId },
            select: { fk_evento: true },
        });

        return links.map(link => link.fk_evento);
    }
}
