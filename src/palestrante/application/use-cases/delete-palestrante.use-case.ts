import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IPalestranteRepository,
    PALESTRANTE_REPOSITORY
} from '../../domain/repositories/palestrante.repository.interface';

export interface DeletePalestranteInput {
    id: number;
}

export interface DeletePalestranteOutput {
    success: boolean;
    message: string;
}

@Injectable()
export class DeletePalestranteUseCase
    implements IUseCase<DeletePalestranteInput, DeletePalestranteOutput> {
    constructor(
        @Inject(PALESTRANTE_REPOSITORY)
        private readonly palestranteRepository: IPalestranteRepository,
    ) { }

    async execute(input: DeletePalestranteInput): Promise<DeletePalestranteOutput> {
        // 1. Check if exists
        const existing = await this.palestranteRepository.findById(input.id);
        if (!existing) {
            throw new NotFoundException(`Palestrante com ID ${input.id} não encontrado`);
        }

        // 2. Delete
        try {
            await this.palestranteRepository.delete(input.id);
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new BadRequestException(
                    'Não é possível deletar este palestrante pois ele está vinculado a outros registros.'
                );
            }
            throw error;
        }

        return {
            success: true,
            message: `Palestrante "${existing.nome}" excluído com sucesso`,
        };
    }
}
