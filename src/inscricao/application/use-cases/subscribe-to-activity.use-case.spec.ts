import { ConflictException, BadRequestException } from '@nestjs/common';
import { SubscribeToActivityUseCase } from './subscribe-to-activity.use-case';
import { IInscricaoRepository } from '../../domain/repositories/inscricao.repository.interface';

describe('SubscribeToActivityUseCase', () => {
    let useCase: SubscribeToActivityUseCase;
    let mockRepository: jest.Mocked<IInscricaoRepository>;

    beforeEach(() => {
        mockRepository = {
            exists: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            getLinkedActivitySession: jest.fn(),
            findSessionByLinkedActivityId: jest.fn(),
        };

        useCase = new SubscribeToActivityUseCase(mockRepository);
    });

    const validInput = {
        fk_data_atividade: 1,
        fk_participante: 10,
    };

    it('should subscribe participant successfully', async () => {
        mockRepository.exists.mockResolvedValue(false);
        mockRepository.create.mockResolvedValue();
        mockRepository.getLinkedActivitySession.mockResolvedValue(null);

        const result = await useCase.execute(validInput);

        expect(result.success).toBe(true);
        expect(mockRepository.create).toHaveBeenCalledWith({
            fk_data_atividade: 1,
            fk_participante: 10,
            presenca: 0,
        });
    });

    it('should throw ConflictException if already subscribed', async () => {
        mockRepository.exists.mockResolvedValue(true);

        await expect(useCase.execute(validInput)).rejects.toThrow(ConflictException);
        expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should auto-subscribe to linked activity', async () => {
        mockRepository.exists.mockResolvedValueOnce(false); // Main activity
        mockRepository.exists.mockResolvedValueOnce(false); // Linked activity
        mockRepository.create.mockResolvedValue();
        mockRepository.getLinkedActivitySession.mockResolvedValue({
            id_data_atividade: 1,
            fk_atividade_vinculada: 5,
        });
        mockRepository.findSessionByLinkedActivityId.mockResolvedValue({
            id_data_atividade: 2,
        });

        const result = await useCase.execute(validInput);

        expect(result.linkedActivitySubscribed).toBe(true);
        expect(mockRepository.create).toHaveBeenCalledTimes(2);
    });

    it('should not fail if linked activity subscription fails', async () => {
        mockRepository.exists.mockResolvedValue(false);
        mockRepository.create.mockResolvedValueOnce(); // Success for main
        mockRepository.getLinkedActivitySession.mockRejectedValue(new Error('DB Error'));

        const result = await useCase.execute(validInput);

        expect(result.success).toBe(true);
        expect(result.linkedActivitySubscribed).toBe(false);
    });
});
