import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IEventoRepository,
    EVENTO_REPOSITORY
} from '../../domain/repositories/evento.repository.interface';

export interface UpdateEventoInput {
    id: number;
    nome?: string;
    data_inicio?: string;
    data_fim?: string;
    ano?: number;
    slug?: string;
    banner?: string;
    cor_primaria?: string;
    cor_secundaria?: string;
    base_url?: string;
}

export interface UpdateEventoOutput {
    id: number;
    nome: string;
    success: boolean;
}

@Injectable()
export class UpdateEventoUseCase
    implements IUseCase<UpdateEventoInput, UpdateEventoOutput> {
    constructor(
        @Inject(EVENTO_REPOSITORY)
        private readonly eventoRepository: IEventoRepository,
    ) { }

    async execute(input: UpdateEventoInput): Promise<UpdateEventoOutput> {
        // 1. Check if event exists
        const existing = await this.eventoRepository.findById(input.id);
        if (!existing) {
            throw new NotFoundException(`Evento com ID ${input.id} não encontrado`);
        }

        // 2. Build update data with date conversion
        const { id, data_inicio, data_fim, ...rest } = input;
        const updateData = {
            ...rest,
            ...(data_inicio && { inicio: new Date(data_inicio) }),
            ...(data_fim && { final: new Date(data_fim) }),
        };

        // 3. Update
        const updated = await this.eventoRepository.update(id, updateData);

        return {
            id: updated.id,
            nome: updated.nome,
            success: true,
        };
    }
}
