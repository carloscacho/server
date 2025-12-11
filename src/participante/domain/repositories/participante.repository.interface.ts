import { Participante, ParticipanteProps } from '../entities/participante.entity';

export interface IParticipanteRepository {
    findById(id: number): Promise<Participante | null>;
    findByUsuarioId(fk_usuario: number): Promise<Participante | null>;
    findAll(): Promise<Participante[]>;
    create(data: ParticipanteProps): Promise<Participante>;
    update(id: number, data: Partial<ParticipanteProps>): Promise<Participante>;
    delete(id: number): Promise<void>;
}

export const PARTICIPANTE_REPOSITORY = Symbol('PARTICIPANTE_REPOSITORY');
