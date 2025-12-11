import { Injectable, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IInscricaoRepository,
    INSCRICAO_REPOSITORY
} from '../../domain/repositories/inscricao.repository.interface';

export interface SubscribeToActivityInput {
    fk_data_atividade: number;
    fk_participante: number;
}

export interface SubscribeToActivityOutput {
    success: boolean;
    linkedActivitySubscribed: boolean;
}

@Injectable()
export class SubscribeToActivityUseCase
    implements IUseCase<SubscribeToActivityInput, SubscribeToActivityOutput> {
    constructor(
        @Inject(INSCRICAO_REPOSITORY)
        private readonly inscricaoRepository: IInscricaoRepository,
    ) { }

    async execute(input: SubscribeToActivityInput): Promise<SubscribeToActivityOutput> {
        // 1. Check if already registered
        const exists = await this.inscricaoRepository.exists(
            input.fk_data_atividade,
            input.fk_participante
        );

        if (exists) {
            throw new ConflictException('Participante já inscrito nesta atividade.');
        }

        // 2. Create registration
        try {
            await this.inscricaoRepository.create({
                fk_data_atividade: input.fk_data_atividade,
                fk_participante: input.fk_participante,
                presenca: 0,
            });
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new BadRequestException('Atividade ou Participante não encontrados.');
            }
            throw error;
        }

        // 3. Auto-subscribe to linked activity if exists
        let linkedActivitySubscribed = false;
        try {
            const linkedInfo = await this.inscricaoRepository.getLinkedActivitySession(
                input.fk_data_atividade
            );

            if (linkedInfo?.fk_atividade_vinculada) {
                const linkedSession = await this.inscricaoRepository.findSessionByLinkedActivityId(
                    linkedInfo.fk_atividade_vinculada
                );

                if (linkedSession) {
                    const linkedExists = await this.inscricaoRepository.exists(
                        linkedSession.id_data_atividade,
                        input.fk_participante
                    );

                    if (!linkedExists) {
                        await this.inscricaoRepository.create({
                            fk_data_atividade: linkedSession.id_data_atividade,
                            fk_participante: input.fk_participante,
                            presenca: 0,
                        });
                        linkedActivitySubscribed = true;
                    }
                }
            }
        } catch (error) {
            console.error('Error auto-subscribing to linked activity:', error);
        }

        return {
            success: true,
            linkedActivitySubscribed,
        };
    }
}
