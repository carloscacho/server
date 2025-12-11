import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IEventoRepository,
    EVENTO_REPOSITORY
} from '../../domain/repositories/evento.repository.interface';

export interface DeleteEventoInput {
    id: number;
}

export interface DeleteEventoOutput {
    success: boolean;
    message: string;
}

@Injectable()
export class DeleteEventoUseCase
    implements IUseCase<DeleteEventoInput, DeleteEventoOutput> {
    constructor(
        @Inject(EVENTO_REPOSITORY)
        private readonly eventoRepository: IEventoRepository,
    ) { }

    async execute(input: DeleteEventoInput): Promise<DeleteEventoOutput> {
        // 1. Check if event exists
        const existing = await this.eventoRepository.findById(input.id);
        if (!existing) {
            throw new NotFoundException(`Evento com ID ${input.id} não encontrado`);
        }

        // 2. Try to delete (may fail due to FK constraints)
        try {
            await this.eventoRepository.delete(input.id);
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new BadRequestException(
                    'Não é possível deletar este evento pois ele está vinculado a outros registros.'
                );
            }
            throw error;
        }

        return {
            success: true,
            message: `Evento "${existing.nome}" excluído com sucesso`,
        };
    }
}
