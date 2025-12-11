import { NotFoundException } from '@nestjs/common';
import { UpdateAtividadeUseCase } from './update-atividade.use-case';
import { IAtividadeRepository } from '../../domain/repositories/atividade.repository.interface';
import { Atividade } from '../../domain/entities/atividade.entity';

describe('UpdateAtividadeUseCase', () => {
    let useCase: UpdateAtividadeUseCase;
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

        useCase = new UpdateAtividadeUseCase(mockRepository);
    });

    const existingActivity = Atividade.create(1, {
        nome: 'Palestra Original',
        fk_evento: 1,
    });

    it('should update an activity successfully', async () => {
        mockRepository.findById.mockResolvedValue(existingActivity);
        mockRepository.update.mockResolvedValue(
            Atividade.create(1, {
                nome: 'Palestra Atualizada',
                fk_evento: 1,
            })
        );

        const result = await useCase.execute({
            id: 1,
            nome: 'Palestra Atualizada',
        });

        expect(result.id).toBe(1);
        expect(result.nome).toBe('Palestra Atualizada');
        expect(result.success).toBe(true);
        expect(mockRepository.update).toHaveBeenCalled();
    });

    it('should throw error when activity not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(
            useCase.execute({ id: 999, nome: 'Nova' })
        ).rejects.toThrow(NotFoundException);
    });

    it('should sync speakers when provided', async () => {
        mockRepository.findById.mockResolvedValue(existingActivity);
        mockRepository.ensureSpeakersLinkedToEvent.mockResolvedValue();
        mockRepository.syncSpeakers.mockResolvedValue();
        mockRepository.update.mockResolvedValue(existingActivity);

        await useCase.execute({
            id: 1,
            palestrantes: [1, 2, 3],
        });

        expect(mockRepository.ensureSpeakersLinkedToEvent).toHaveBeenCalledWith(
            [1, 2, 3],
            1,
        );
        expect(mockRepository.syncSpeakers).toHaveBeenCalledWith(1, [1, 2, 3]);
    });

    it('should upsert schedule when provided', async () => {
        mockRepository.findById.mockResolvedValue(existingActivity);
        mockRepository.upsertSchedule.mockResolvedValue();
        mockRepository.update.mockResolvedValue(existingActivity);

        await useCase.execute({
            id: 1,
            data_atividade: {
                data: '2024-12-15',
                hora: '10:00',
            },
        });

        expect(mockRepository.upsertSchedule).toHaveBeenCalledWith(
            1,
            expect.objectContaining({
                data: expect.any(Date),
                hora: expect.any(Date),
            })
        );
    });

    it('should not sync speakers when empty array provided', async () => {
        mockRepository.findById.mockResolvedValue(existingActivity);
        mockRepository.syncSpeakers.mockResolvedValue();
        mockRepository.update.mockResolvedValue(existingActivity);

        await useCase.execute({
            id: 1,
            palestrantes: [],
        });

        expect(mockRepository.ensureSpeakersLinkedToEvent).not.toHaveBeenCalled();
        expect(mockRepository.syncSpeakers).toHaveBeenCalledWith(1, []);
    });
});
