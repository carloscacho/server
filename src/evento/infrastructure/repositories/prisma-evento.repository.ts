import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
    IEventoRepository,
    CreateEventoData,
    UpdateEventoData
} from '../../domain/repositories/evento.repository.interface';
import { Evento } from '../../domain/entities/evento.entity';

@Injectable()
export class PrismaEventoRepository implements IEventoRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: number): Promise<Evento | null> {
        const data = await this.prisma.evento.findUnique({
            where: { id_evento: id },
        });

        if (!data) return null;

        return Evento.create(data.id_evento, {
            nome: data.nome,
            inicio: data.inicio,
            final: data.final,
            ano: data.ano,
            slug: data.slug,
            banner: data.banner,
            cor_primaria: data.cor_primaria,
            cor_secundaria: data.cor_secundaria,
            base_url: data.base_url,
        });
    }

    async findBySlug(slug: string): Promise<Evento | null> {
        const data = await this.prisma.evento.findFirst({
            where: { slug },
        });

        if (!data) return null;

        return Evento.create(data.id_evento, {
            nome: data.nome,
            inicio: data.inicio,
            final: data.final,
            ano: data.ano,
            slug: data.slug,
            banner: data.banner,
            cor_primaria: data.cor_primaria,
            cor_secundaria: data.cor_secundaria,
            base_url: data.base_url,
        });
    }

    async findAll(): Promise<Evento[]> {
        const data = await this.prisma.evento.findMany();

        return data.map(item => Evento.create(item.id_evento, {
            nome: item.nome,
            inicio: item.inicio,
            final: item.final,
            ano: item.ano,
            slug: item.slug,
            banner: item.banner,
            cor_primaria: item.cor_primaria,
            cor_secundaria: item.cor_secundaria,
            base_url: item.base_url,
        }));
    }

    async create(data: CreateEventoData): Promise<Evento> {
        const created = await this.prisma.evento.create({
            data: {
                nome: data.nome,
                inicio: data.inicio,
                final: data.final,
                ano: data.ano,
                slug: data.slug,
                banner: data.banner,
                cor_primaria: data.cor_primaria,
                cor_secundaria: data.cor_secundaria,
                base_url: data.base_url,
            },
        });

        return Evento.create(created.id_evento, {
            nome: created.nome,
            inicio: created.inicio,
            final: created.final,
            ano: created.ano,
            slug: created.slug,
            banner: created.banner,
            cor_primaria: created.cor_primaria,
            cor_secundaria: created.cor_secundaria,
            base_url: created.base_url,
        });
    }

    async update(id: number, data: UpdateEventoData): Promise<Evento> {
        const updated = await this.prisma.evento.update({
            where: { id_evento: id },
            data: {
                nome: data.nome,
                inicio: data.inicio,
                final: data.final,
                ano: data.ano,
                slug: data.slug,
                banner: data.banner,
                cor_primaria: data.cor_primaria,
                cor_secundaria: data.cor_secundaria,
                base_url: data.base_url,
            },
        });

        return Evento.create(updated.id_evento, {
            nome: updated.nome,
            inicio: updated.inicio,
            final: updated.final,
            ano: updated.ano,
            slug: updated.slug,
            banner: updated.banner,
            cor_primaria: updated.cor_primaria,
            cor_secundaria: updated.cor_secundaria,
            base_url: updated.base_url,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.evento.delete({
            where: { id_evento: id },
        });
    }
}
