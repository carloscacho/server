import { CreateEventoUseCase } from './create-evento.use-case';
import { IEventoRepository } from '../../domain/repositories/evento.repository.interface';
import { Evento } from '../../domain/entities/evento.entity';

describe('CreateEventoUseCase', () => {
  let useCase: CreateEventoUseCase;
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

    useCase = new CreateEventoUseCase(mockRepository);
  });

  const validInput = {
    nome: 'IFMS Tech 2024',
    data_inicio: '2024-12-01',
    data_fim: '2024-12-03',
    ano: 2024,
    slug: 'ifms-tech-2024',
  };

  it('should create an event successfully', async () => {
    mockRepository.create.mockResolvedValue(
      Evento.create(1, {
        nome: validInput.nome,
        inicio: new Date(validInput.data_inicio),
        final: new Date(validInput.data_fim),
        ano: validInput.ano,
        slug: validInput.slug,
      })
    );

    const result = await useCase.execute(validInput);

    expect(result.id).toBe(1);
    expect(result.nome).toBe('IFMS Tech 2024');
    expect(result.slug).toBe('ifms-tech-2024');
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it('should convert date strings to Date objects', async () => {
    mockRepository.create.mockImplementation(async (data) => {
      expect(data.inicio).toBeInstanceOf(Date);
      expect(data.final).toBeInstanceOf(Date);
      return Evento.create(1, {
        nome: data.nome,
        inicio: data.inicio,
        final: data.final,
        ano: data.ano,
      });
    });

    await useCase.execute(validInput);

    expect(mockRepository.create).toHaveBeenCalled();
  });

  it('should create event with all optional fields', async () => {
    const fullInput = {
      ...validInput,
      banner: '/images/banner.jpg',
      cor_primaria: '#FF0000',
      cor_secundaria: '#00FF00',
      base_url: 'https://evento.ifms.edu.br',
    };

    mockRepository.create.mockResolvedValue(
      Evento.create(1, {
        nome: fullInput.nome,
        inicio: new Date(fullInput.data_inicio),
        final: new Date(fullInput.data_fim),
        ano: fullInput.ano,
        slug: fullInput.slug,
        banner: fullInput.banner,
        cor_primaria: fullInput.cor_primaria,
        cor_secundaria: fullInput.cor_secundaria,
        base_url: fullInput.base_url,
      })
    );

    await useCase.execute(fullInput);

    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        banner: '/images/banner.jpg',
      })
    );
  });
});
