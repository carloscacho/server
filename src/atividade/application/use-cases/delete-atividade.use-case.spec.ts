import { NotFoundException } from '@nestjs/common';
import { DeleteAtividadeUseCase } from './delete-atividade.use-case';
import { IAtividadeRepository } from '../../domain/repositories/atividade.repository.interface';
import { Atividade } from '../../domain/entities/atividade.entity';

describe('DeleteAtividadeUseCase', () => {
    let useCase: DeleteAtividadeUseCase;
    let mockRepository: jest.Mocked<IAtividadeRepository>;

    beforeEach(() => {
        mockRepository = {
            findById: jest.fn(),
            findByIdWithSchedule: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            ensureSpeakersLinkedToEvent: jest.fn(),
            syncSpeakers: jest.fn(),
            upsertSchedule: jest.fn(),
            deleteWithCascade: jest.fn(),
        };

        useCase = new DeleteAtividadeUseCase(mockRepository);
    });

    it('should delete an activity successfully', async () => {
        const existingActivity = Atividade.create(1, {
            nome: 'Palestra para Deletar',
            fk_evento: 1,
        });

        mockRepository.findById.mockResolvedValue(existingActivity);
        mockRepository.deleteWithCascade.mockResolvedValue();

        const result = await useCase.execute({ id: 1 });

        expect(result.success).toBe(true);
        expect(result.message).toContain('Palestra para Deletar');
        expect(mockRepository.deleteWithCascade).toHaveBeenCalledWith(1);
    });

    it('should throw error when activity not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(
            useCase.execute({ id: 999 })
        ).rejects.toThrow(NotFoundException);

        expect(mockRepository.deleteWithCascade).not.toHaveBeenCalled();
    });

    it('should call deleteWithCascade for cascade deletion', async () => {
        const existingActivity = Atividade.create(1, {
            nome: 'Atividade com Participantes',
            fk_evento: 1,
        });

        mockRepository.findById.mockResolvedValue(existingActivity);
        mockRepository.deleteWithCascade.mockResolvedValue();

        await useCase.execute({ id: 1 });

        expect(mockRepository.deleteWithCascade).toHaveBeenCalledWith(1);
        expect(mockRepository.delete).not.toHaveBeenCalled(); // Should use cascade
    });
});
