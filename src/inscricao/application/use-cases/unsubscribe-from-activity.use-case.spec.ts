import { UnsubscribeFromActivityUseCase } from './unsubscribe-from-activity.use-case';
import { IInscricaoRepository } from '../../domain/repositories/inscricao.repository.interface';

describe('UnsubscribeFromActivityUseCase', () => {
    let useCase: UnsubscribeFromActivityUseCase;
    let mockRepository: jest.Mocked<IInscricaoRepository>;

    beforeEach(() => {
        mockRepository = {
            exists: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            getLinkedActivitySession: jest.fn(),
            findSessionByLinkedActivityId: jest.fn(),
        };

        useCase = new UnsubscribeFromActivityUseCase(mockRepository);
    });

    it('should unsubscribe participant successfully', async () => {
        mockRepository.delete.mockResolvedValue();

        const result = await useCase.execute({
            fk_data_atividade: 1,
            fk_participante: 10,
        });

        expect(result.success).toBe(true);
        expect(mockRepository.delete).toHaveBeenCalledWith(1, 10);
    });

    it('should be idempotent (not fail if not subscribed)', async () => {
        mockRepository.delete.mockResolvedValue();

        const result = await useCase.execute({
            fk_data_atividade: 999,
            fk_participante: 999,
        });

        expect(result.success).toBe(true);
    });
});
