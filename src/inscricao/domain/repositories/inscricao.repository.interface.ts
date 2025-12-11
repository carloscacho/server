/**
 * Inscricao Repository Interface
 * Handles participant registrations for activities
 */
export interface InscricaoData {
    fk_data_atividade: number;
    fk_participante: number;
    presenca?: number;
}

export interface LinkedActivityInfo {
    id_data_atividade: number;
    fk_atividade_vinculada: number | null;
}

export interface IInscricaoRepository {
    // Check if registration exists
    exists(fk_data_atividade: number, fk_participante: number): Promise<boolean>;

    // Create registration
    create(data: InscricaoData): Promise<void>;

    // Delete registration (idempotent)
    delete(fk_data_atividade: number, fk_participante: number): Promise<void>;

    // Get linked activity session info
    getLinkedActivitySession(fk_data_atividade: number): Promise<LinkedActivityInfo | null>;

    // Find session by linked activity ID
    findSessionByLinkedActivityId(fk_atividade: number): Promise<{ id_data_atividade: number } | null>;
}

export const INSCRICAO_REPOSITORY = Symbol('INSCRICAO_REPOSITORY');
