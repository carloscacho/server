import { CreatePalestranteUseCase } from './create-palestrante.use-case';
import { IPalestranteRepository } from '../../domain/repositories/palestrante.repository.interface';
import { Palestrante } from '../../domain/entities/palestrante.entity';

describe('CreatePalestranteUseCase', () => {
    let useCase: CreatePalestranteUseCase;
    let mockRepository: jest.Mocked<IPalestranteRepository>;

    beforeEach(() => {
        mockRepository = {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            linkToEvents: jest.fn(),
            syncEventLinks: jest.fn(),
            getLinkedEventIds: jest.fn(),
        };

        useCase = new CreatePalestranteUseCase(mockRepository);
    });

    const validInput = {
        nome: 'Dr. João',
        email: 'joao@example.com',
        instituicao: 'IFMS',
    };

    it('should create new palestrante', async () => {
        mockRepository.findByEmail.mockResolvedValue(null);
        mockRepository.create.mockResolvedValue(
            Palestrante.create(1, validInput)
        );

        const result = await useCase.execute(validInput);

        expect(result.id).toBe(1);
        expect(result.isExisting).toBe(false);
        expect(mockRepository.create).toHaveBeenCalled();
    });

    it('should return existing if email exists', async () => {
        const existing = Palestrante.create(5, validInput);
        mockRepository.findByEmail.mockResolvedValue(existing);
        mockRepository.getLinkedEventIds.mockResolvedValue([]);

        const result = await useCase.execute(validInput);

        expect(result.id).toBe(5);
        expect(result.isExisting).toBe(true);
        expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should link existing palestrante to new events', async () => {
        const existing = Palestrante.create(5, validInput);
        mockRepository.findByEmail.mockResolvedValue(existing);
        mockRepository.getLinkedEventIds.mockResolvedValue([1]);
        mockRepository.linkToEvents.mockResolvedValue();

        await useCase.execute({ ...validInput, eventos: [1, 2, 3] });

        // Should only link to events 2 and 3 (not 1, already linked)
        expect(mockRepository.linkToEvents).toHaveBeenCalledWith(5, [2, 3]);
    });
});
