import { CreateAtividadeUseCase } from './create-atividade.use-case';
import { IAtividadeRepository } from '../../domain/repositories/atividade.repository.interface';
import { Atividade } from '../../domain/entities/atividade.entity';

describe('CreateAtividadeUseCase', () => {
    let useCase: CreateAtividadeUseCase;
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

        useCase = new CreateAtividadeUseCase(mockRepository);
    });

    const validInput = {
        nome: 'Palestra de Abertura',
        fk_evento: 1,
        descricao: 'Palestra inaugural do evento',
        tipo: 'Palestra',
    };

    it('should create an activity successfully', async () => {
        mockRepository.create.mockResolvedValue(
            Atividade.create(1, {
                nome: validInput.nome,
                fk_evento: validInput.fk_evento,
                descricao: validInput.descricao,
            })
        );

        const result = await useCase.execute(validInput);

        expect(result.id).toBe(1);
        expect(result.nome).toBe('Palestra de Abertura');
        expect(result.fk_evento).toBe(1);
        expect(mockRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                tipo: 'Palestra',
                descricao: 'Palestra inaugural do evento',
            })
        );
    });

    it('should create activity with speakers', async () => {
        const inputWithSpeakers = {
            ...validInput,
            palestrantes: [1, 2],
        };

        mockRepository.ensureSpeakersLinkedToEvent.mockResolvedValue();
        mockRepository.create.mockResolvedValue(
            Atividade.create(1, {
                nome: inputWithSpeakers.nome,
                fk_evento: inputWithSpeakers.fk_evento,
                palestrantes: inputWithSpeakers.palestrantes,
            })
        );

        await useCase.execute(inputWithSpeakers);

        expect(mockRepository.ensureSpeakersLinkedToEvent).toHaveBeenCalledWith(
            [1, 2],
            1,
        );
        expect(mockRepository.create).toHaveBeenCalled();
    });

    it('should create activity with schedule', async () => {
        const inputWithSchedule = {
            ...validInput,
            data_atividade: {
                data: '2024-12-15',
                hora: '09:00',
                duracao: '02:00',
            },
        };

        mockRepository.create.mockResolvedValue(
            Atividade.create(1, {
                nome: inputWithSchedule.nome,
                fk_evento: inputWithSchedule.fk_evento,
            })
        );

        await useCase.execute(inputWithSchedule);

        expect(mockRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                dataAtividade: expect.objectContaining({
                    data: expect.any(Date),
                    hora: expect.any(Date),
                }),
            })
        );
    });

    it('should not call ensureSpeakersLinkedToEvent when no speakers provided', async () => {
        mockRepository.create.mockResolvedValue(
            Atividade.create(1, {
                nome: validInput.nome,
                fk_evento: validInput.fk_evento,
            })
        );

        await useCase.execute(validInput);

        expect(mockRepository.ensureSpeakersLinkedToEvent).not.toHaveBeenCalled();
    });
});
