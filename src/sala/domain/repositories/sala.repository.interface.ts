import { Sala } from '../entities/sala.entity';

export interface ISalaRepository {
    findById(id: number): Promise<Sala | null>;
    findAll(): Promise<Sala[]>;
    create(nome: string): Promise<Sala>;
    update(id: number, nome: string): Promise<Sala>;
    delete(id: number): Promise<void>;
}

export const SALA_REPOSITORY = Symbol('SALA_REPOSITORY');
