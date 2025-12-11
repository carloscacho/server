import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IInscricaoRepository,
    INSCRICAO_REPOSITORY
} from '../../domain/repositories/inscricao.repository.interface';

export interface UnsubscribeFromActivityInput {
    fk_data_atividade: number;
    fk_participante: number;
}

export interface UnsubscribeFromActivityOutput {
    success: boolean;
}

@Injectable()
export class UnsubscribeFromActivityUseCase
    implements IUseCase<UnsubscribeFromActivityInput, UnsubscribeFromActivityOutput> {
    constructor(
        @Inject(INSCRICAO_REPOSITORY)
        private readonly inscricaoRepository: IInscricaoRepository,
    ) { }

    async execute(input: UnsubscribeFromActivityInput): Promise<UnsubscribeFromActivityOutput> {
        // Idempotent deletion - doesn't fail if not exists
        await this.inscricaoRepository.delete(
            input.fk_data_atividade,
            input.fk_participante,
        );

        return {
            success: true,
        };
    }
}
