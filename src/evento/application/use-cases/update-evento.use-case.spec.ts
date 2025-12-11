import { NotFoundException } from '@nestjs/common';
import { UpdateEventoUseCase } from './update-evento.use-case';
import { IEventoRepository } from '../../domain/repositories/evento.repository.interface';
import { Evento } from '../../domain/entities/evento.entity';

describe('UpdateEventoUseCase', () => {
    let useCase: UpdateEventoUseCase;
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

        useCase = new UpdateEventoUseCase(mockRepository);
    });

    const existingEvent = Evento.create(1, {
        nome: 'IFMS Tech 2024',
        inicio: new Date('2024-12-01'),
        final: new Date('2024-12-03'),
        ano: 2024,
    });

    it('should update an event successfully', async () => {
        mockRepository.findById.mockResolvedValue(existingEvent);
        mockRepository.update.mockResolvedValue(
            Evento.create(1, {
                nome: 'IFMS Tech 2024 - Atualizado',
                inicio: new Date('2024-12-01'),
                final: new Date('2024-12-03'),
                ano: 2024,
            })
        );

        const result = await useCase.execute({
            id: 1,
            nome: 'IFMS Tech 2024 - Atualizado',
        });

        expect(result.id).toBe(1);
        expect(result.nome).toBe('IFMS Tech 2024 - Atualizado');
        expect(result.success).toBe(true);
    });

    it('should throw error when event not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(
            useCase.execute({ id: 999, nome: 'Novo Nome' })
        ).rejects.toThrow(NotFoundException);
    });

    it('should convert date strings when updating dates', async () => {
        mockRepository.findById.mockResolvedValue(existingEvent);
        mockRepository.update.mockImplementation(async (id, data) => {
            if (data.inicio) expect(data.inicio).toBeInstanceOf(Date);
            if (data.final) expect(data.final).toBeInstanceOf(Date);
            return existingEvent;
        });

        await useCase.execute({
            id: 1,
            data_inicio: '2024-12-10',
            data_fim: '2024-12-15',
        });

        expect(mockRepository.update).toHaveBeenCalled();
    });
});
