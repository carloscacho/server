import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IAtividadeRepository,
    ATIVIDADE_REPOSITORY
} from '../../domain/repositories/atividade.repository.interface';
import { Atividade } from '../../domain/entities/atividade.entity';
import { DataAtividade } from '../../domain/entities/data-atividade.entity';

export interface UpdateAtividadeInput {
    id: number;
    nome?: string;
    descricao?: string;
    observacao?: string;
    limite?: number;
    fk_sala?: number;
    fk_evento?: number;
    fk_atividade_vinculada?: number;
    palestrantes?: number[];
    data_atividade?: {
        data: string;
        hora: string;
        duracao?: string;
    };
}

export interface UpdateAtividadeOutput {
    id: number;
    nome: string;
    success: boolean;
}

@Injectable()
export class UpdateAtividadeUseCase
    implements IUseCase<UpdateAtividadeInput, UpdateAtividadeOutput> {
    constructor(
        @Inject(ATIVIDADE_REPOSITORY)
        private readonly atividadeRepository: IAtividadeRepository,
    ) { }

    async execute(input: UpdateAtividadeInput): Promise<UpdateAtividadeOutput> {
        // 1. Check if activity exists
        const existing = await this.atividadeRepository.findById(input.id);
        if (!existing) {
            throw new NotFoundException(`Atividade com ID ${input.id} não encontrada`);
        }

        const eventId = input.fk_evento ?? existing.fk_evento;

        // 2. Ensure speakers are linked to the event (if provided)
        if (input.palestrantes && input.palestrantes.length > 0) {
            await this.atividadeRepository.ensureSpeakersLinkedToEvent(
                input.palestrantes,
                eventId,
            );
        }

        // 3. Sync speakers if provided
        if (input.palestrantes !== undefined) {
            await this.atividadeRepository.syncSpeakers(input.id, input.palestrantes);
        }

        // 4. Upsert schedule if provided
        if (input.data_atividade) {
            const scheduleData = DataAtividade.fromInput(input.data_atividade);
            await this.atividadeRepository.upsertSchedule(input.id, scheduleData);
        }

        // 5. Update activity basic fields
        const { id, palestrantes, data_atividade, ...updateData } = input;
        const updated = await this.atividadeRepository.update(id, updateData);

        return {
            id: updated.id,
            nome: updated.nome,
            success: true,
        };
    }
}
