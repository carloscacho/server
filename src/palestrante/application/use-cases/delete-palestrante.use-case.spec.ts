import { NotFoundException, BadRequestException } from '@nestjs/common';
import { DeletePalestranteUseCase } from './delete-palestrante.use-case';
import { IPalestranteRepository } from '../../domain/repositories/palestrante.repository.interface';
import { Palestrante } from '../../domain/entities/palestrante.entity';

describe('DeletePalestranteUseCase', () => {
    let useCase: DeletePalestranteUseCase;
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

        useCase = new DeletePalestranteUseCase(mockRepository);
    });

    it('should delete palestrante successfully', async () => {
        mockRepository.findById.mockResolvedValue(
            Palestrante.create(1, { nome: 'Dr. João', email: 'joao@test.com' })
        );
        mockRepository.delete.mockResolvedValue();

        const result = await useCase.execute({ id: 1 });

        expect(result.success).toBe(true);
        expect(result.message).toContain('Dr. João');
    });

    it('should throw NotFoundException if not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(useCase.execute({ id: 999 })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException on FK constraint', async () => {
        mockRepository.findById.mockResolvedValue(
            Palestrante.create(1, { nome: 'Dr. João', email: 'joao@test.com' })
        );
        mockRepository.delete.mockRejectedValue({ code: 'P2003' });

        await expect(useCase.execute({ id: 1 })).rejects.toThrow(BadRequestException);
    });
});
