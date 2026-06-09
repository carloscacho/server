import { Atividade } from '../entities/atividade.entity';
import { DataAtividadeProps } from '../entities/data-atividade.entity';

export interface CreateAtividadeData {
    nome: string;
    tipo?: string | null;
    descricao?: string | null;
    observacao?: string | null;
    limite?: number | null;
    fk_sala?: number | null;
    fk_evento: number;
    fk_atividade_vinculada?: number | null;
    palestrantes?: number[];
    dataAtividade?: DataAtividadeProps | null;
}

export interface UpdateAtividadeData extends Partial<CreateAtividadeData> {
    id: number;
}

/**
 * Atividade Repository Interface
 */
export interface IAtividadeRepository {
    findById(id: number): Promise<Atividade | null>;
    findByIdWithSchedule(id: number): Promise<Atividade | null>;
    create(data: CreateAtividadeData): Promise<Atividade>;
    update(id: number, data: Partial<CreateAtividadeData>): Promise<Atividade>;
    delete(id: number): Promise<void>;

    // Speaker link management
    ensureSpeakersLinkedToEvent(speakerIds: number[], eventId: number): Promise<void>;
    syncSpeakers(activityId: number, speakerIds: number[]): Promise<void>;

    // Schedule management
    upsertSchedule(activityId: number, schedule: DataAtividadeProps): Promise<void>;

    // Cascade deletion
    deleteWithCascade(id: number): Promise<void>;
}

export const ATIVIDADE_REPOSITORY = Symbol('ATIVIDADE_REPOSITORY');
