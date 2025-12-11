import { DataAtividadeEntity, DataAtividadeProps } from '../entities/data-atividade.entity';

export interface IDataAtividadeRepository {
    findById(id: number): Promise<DataAtividadeEntity | null>;
    findByAtividade(fk_atividade: number): Promise<DataAtividadeEntity[]>;
    create(data: DataAtividadeProps): Promise<DataAtividadeEntity>;
    update(id: number, data: Partial<DataAtividadeProps>): Promise<DataAtividadeEntity>;
    delete(id: number): Promise<void>;
}

export const DATA_ATIVIDADE_REPOSITORY = Symbol('DATA_ATIVIDADE_REPOSITORY');
