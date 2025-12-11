import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IAtividadeRepository,
    ATIVIDADE_REPOSITORY
} from '../../domain/repositories/atividade.repository.interface';

export interface DeleteAtividadeInput {
    id: number;
}

export interface DeleteAtividadeOutput {
    success: boolean;
    message: string;
}

@Injectable()
export class DeleteAtividadeUseCase
    implements IUseCase<DeleteAtividadeInput, DeleteAtividadeOutput> {
    constructor(
        @Inject(ATIVIDADE_REPOSITORY)
        private readonly atividadeRepository: IAtividadeRepository,
    ) { }

    async execute(input: DeleteAtividadeInput): Promise<DeleteAtividadeOutput> {
        // 1. Check if activity exists
        const existing = await this.atividadeRepository.findById(input.id);
        if (!existing) {
            throw new NotFoundException(`Atividade com ID ${input.id} não encontrada`);
        }

        // 2. Delete with cascade (participants -> schedules -> speakers -> activity)
        await this.atividadeRepository.deleteWithCascade(input.id);

        return {
            success: true,
            message: `Atividade "${existing.nome}" excluída com sucesso`,
        };
    }
}
