import { Evento } from '../entities/evento.entity';

export interface CreateEventoData {
    nome: string;
    inicio: Date;
    final: Date;
    ano: number;
    slug?: string | null;
    banner?: string | null;
    cor_primaria?: string | null;
    cor_secundaria?: string | null;
    base_url?: string | null;
}

export interface UpdateEventoData extends Partial<CreateEventoData> { }

/**
 * Evento Repository Interface
 */
export interface IEventoRepository {
    findById(id: number): Promise<Evento | null>;
    findBySlug(slug: string): Promise<Evento | null>;
    findAll(): Promise<Evento[]>;
    create(data: CreateEventoData): Promise<Evento>;
    update(id: number, data: UpdateEventoData): Promise<Evento>;
    delete(id: number): Promise<void>;
}

export const EVENTO_REPOSITORY = Symbol('EVENTO_REPOSITORY');
