import { Palestrante } from '../entities/palestrante.entity';

export interface CreatePalestranteData {
    nome: string;
    email: string;
    instituicao?: string | null;
    foto?: string | null;
    eventos?: number[];
}

export interface IPalestranteRepository {
    findById(id: number): Promise<Palestrante | null>;
    findByEmail(email: string): Promise<Palestrante | null>;
    create(data: CreatePalestranteData): Promise<Palestrante>;
    update(id: number, data: Partial<CreatePalestranteData>): Promise<Palestrante>;
    delete(id: number): Promise<void>;

    // Event linking
    linkToEvents(palestranteId: number, eventIds: number[]): Promise<void>;
    syncEventLinks(palestranteId: number, eventIds: number[]): Promise<void>;
    getLinkedEventIds(palestranteId: number): Promise<number[]>;
}

export const PALESTRANTE_REPOSITORY = Symbol('PALESTRANTE_REPOSITORY');
