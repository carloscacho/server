import { NotFoundException, BadRequestException } from '@nestjs/common';
import { DeleteEventoUseCase } from './delete-evento.use-case';
import { IEventoRepository } from '../../domain/repositories/evento.repository.interface';
import { Evento } from '../../domain/entities/evento.entity';

describe('DeleteEventoUseCase', () => {
    let useCase: DeleteEventoUseCase;
    let mockRepository: jest.Mocked<IEventoRepository>;

    beforeEach(() => {
        mockRepository = {
            findById: jest.fn(),
            findBySlug: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        useCase = new DeleteEventoUseCase(mockRepository);
    });

    const existingEvent = Evento.create(1, {
        nome: 'IFMS Tech 2024',
        inicio: new Date('2024-12-01'),
        final: new Date('2024-12-03'),
        ano: 2024,
    });

    it('should delete an event successfully', async () => {
        mockRepository.findById.mockResolvedValue(existingEvent);
        mockRepository.delete.mockResolvedValue();

        const result = await useCase.execute({ id: 1 });

        expect(result.success).toBe(true);
        expect(result.message).toContain('IFMS Tech 2024');
        expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error when event not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(
            useCase.execute({ id: 999 })
        ).rejects.toThrow(NotFoundException);

        expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException on FK constraint violation', async () => {
        mockRepository.findById.mockResolvedValue(existingEvent);
        mockRepository.delete.mockRejectedValue({ code: 'P2003' });

        await expect(
            useCase.execute({ id: 1 })
        ).rejects.toThrow(BadRequestException);
    });

    it('should re-throw other errors', async () => {
        mockRepository.findById.mockResolvedValue(existingEvent);
        mockRepository.delete.mockRejectedValue(new Error('Database error'));

        await expect(
            useCase.execute({ id: 1 })
        ).rejects.toThrow('Database error');
    });
});
