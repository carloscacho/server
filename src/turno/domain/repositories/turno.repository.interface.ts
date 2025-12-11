import { Turno } from '../entities/turno.entity';

export interface ITurnoRepository {
    findById(id: number): Promise<Turno | null>;
    findAll(): Promise<Turno[]>;
    create(nome: string): Promise<Turno>;
    update(id: number, nome: string): Promise<Turno>;
    delete(id: number): Promise<void>;
}

export const TURNO_REPOSITORY = Symbol('TURNO_REPOSITORY');
