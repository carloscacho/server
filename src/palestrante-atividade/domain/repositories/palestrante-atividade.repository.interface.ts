import { PalestranteAtividade, PalestranteAtividadeProps } from '../entities/palestrante-atividade.entity';

export interface IPalestranteAtividadeRepository {
    findById(fk_atividade: number, fk_palestrante: number): Promise<PalestranteAtividade | null>;
    findByAtividade(fk_atividade: number): Promise<PalestranteAtividade[]>;
    findByPalestrante(fk_palestrante: number): Promise<PalestranteAtividade[]>;
    create(data: PalestranteAtividadeProps): Promise<PalestranteAtividade>;
    delete(fk_atividade: number, fk_palestrante: number): Promise<void>;
}

export const PALESTRANTE_ATIVIDADE_REPOSITORY = Symbol('PALESTRANTE_ATIVIDADE_REPOSITORY');
