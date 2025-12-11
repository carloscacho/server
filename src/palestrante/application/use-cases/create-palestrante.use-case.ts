import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IPalestranteRepository,
    PALESTRANTE_REPOSITORY
} from '../../domain/repositories/palestrante.repository.interface';
import { Palestrante } from '../../domain/entities/palestrante.entity';

export interface CreatePalestranteInput {
    nome: string;
    email: string;
    instituicao?: string;
    foto?: string;
    eventos?: number[];
}

export interface CreatePalestranteOutput {
    id: number;
    nome: string;
    email: string;
    isExisting: boolean;
}

@Injectable()
export class CreatePalestranteUseCase
    implements IUseCase<CreatePalestranteInput, CreatePalestranteOutput> {
    constructor(
        @Inject(PALESTRANTE_REPOSITORY)
        private readonly palestranteRepository: IPalestranteRepository,
    ) { }

    async execute(input: CreatePalestranteInput): Promise<CreatePalestranteOutput> {
        // 1. Check if palestrante with email already exists
        const existing = await this.palestranteRepository.findByEmail(input.email);

        if (existing) {
            // Link to new events if provided
            if (input.eventos && input.eventos.length > 0) {
                const currentEventIds = await this.palestranteRepository.getLinkedEventIds(existing.id);
                const newEventIds = input.eventos.filter(id => !currentEventIds.includes(id));

                if (newEventIds.length > 0) {
                    await this.palestranteRepository.linkToEvents(existing.id, newEventIds);
                }
            }

            return {
                id: existing.id,
                nome: existing.nome,
                email: existing.email,
                isExisting: true,
            };
        }

        // 2. Create new palestrante
        const created = await this.palestranteRepository.create({
            nome: input.nome,
            email: input.email,
            instituicao: input.instituicao,
            foto: input.foto,
            eventos: input.eventos,
        });

        return {
            id: created.id,
            nome: created.nome,
            email: created.email,
            isExisting: false,
        };
    }
}
