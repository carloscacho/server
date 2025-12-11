import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IAtividadeRepository,
    ATIVIDADE_REPOSITORY,
    CreateAtividadeData
} from '../../domain/repositories/atividade.repository.interface';
import { Atividade } from '../../domain/entities/atividade.entity';
import { DataAtividade } from '../../domain/entities/data-atividade.entity';

export interface CreateAtividadeInput {
    nome: string;
    descricao?: string;
    observacao?: string;
    limite?: number;
    fk_sala?: number;
    fk_evento: number;
    fk_atividade_vinculada?: number;
    palestrantes?: number[];
    data_atividade?: {
        data: string;
        hora: string;
        duracao?: string;
    };
}

export interface CreateAtividadeOutput {
    id: number;
    nome: string;
    fk_evento: number;
}

@Injectable()
export class CreateAtividadeUseCase
    implements IUseCase<CreateAtividadeInput, CreateAtividadeOutput> {
    constructor(
        @Inject(ATIVIDADE_REPOSITORY)
        private readonly atividadeRepository: IAtividadeRepository,
    ) { }

    async execute(input: CreateAtividadeInput): Promise<CreateAtividadeOutput> {
        // 1. Ensure speakers are linked to the event
        if (input.palestrantes && input.palestrantes.length > 0) {
            await this.atividadeRepository.ensureSpeakersLinkedToEvent(
                input.palestrantes,
                input.fk_evento,
            );
        }

        // 2. Build create data
        const createData: CreateAtividadeData = {
            nome: input.nome,
            descricao: input.descricao,
            observacao: input.observacao,
            limite: input.limite,
            fk_sala: input.fk_sala,
            fk_evento: input.fk_evento,
            fk_atividade_vinculada: input.fk_atividade_vinculada,
            palestrantes: input.palestrantes,
            dataAtividade: input.data_atividade
                ? DataAtividade.fromInput(input.data_atividade)
                : null,
        };

        // 3. Create activity
        const created = await this.atividadeRepository.create(createData);

        return {
            id: created.id,
            nome: created.nome,
            fk_evento: created.fk_evento,
        };
    }
}
