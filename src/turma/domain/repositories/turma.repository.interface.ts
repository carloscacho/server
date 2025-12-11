import { Turma } from '../entities/turma.entity';

export interface ITurmaRepository {
    findById(id: number): Promise<Turma | null>;
    findAll(): Promise<Turma[]>;
    create(nome: string): Promise<Turma>;
    update(id: number, nome: string): Promise<Turma>;
    delete(id: number): Promise<void>;
}

export const TURMA_REPOSITORY = Symbol('TURMA_REPOSITORY');
