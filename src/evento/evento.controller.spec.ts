import { Test, TestingModule } from '@nestjs/testing';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';
import { EventoDTO } from './dto/evento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('EventoController', () => {
  let controller: EventoController;
  let service: EventoService;

  const mockEventoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventoController],
      providers: [
        {
          provide: EventoService,
          useValue: mockEventoService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<EventoController>(EventoController);
    service = module.get<EventoService>(EventoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event without uploaded file', async () => {
      const dto: EventoDTO = {
        nome: 'Evento Teste',
        data_inicio: new Date(),
        data_fim: new Date(),
        ano: 2026,
      };

      mockEventoService.create.mockResolvedValue({ id_evento: 1, ...dto });

      const result = await controller.create(dto, null as any);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id_evento: 1, ...dto });
    });

    it('should create an event and set banner when file is uploaded', async () => {
      const dto: EventoDTO = {
        nome: 'Evento Com Imagem',
        data_inicio: new Date(),
        data_fim: new Date(),
        ano: 2026,
      };

      const file = {
        filename: 'banner-test.png',
      } as Express.Multer.File;

      mockEventoService.create.mockResolvedValue({ id_evento: 2, ...dto, banner: '/uploads/banner-test.png' });

      const result = await controller.create(dto, file);

      expect(dto.banner).toBe('/uploads/banner-test.png');
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id_evento: 2, ...dto, banner: '/uploads/banner-test.png' });
    });

    it('should parse string ano parameter to number', async () => {
      const dto = {
        nome: 'Evento Ano String',
        data_inicio: new Date(),
        data_fim: new Date(),
        ano: '2026' as any,
      };

      mockEventoService.create.mockResolvedValue({ id_evento: 3, ...dto, ano: 2026 });

      await controller.create(dto as any, null as any);

      expect(dto.ano).toBe(2026);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const events = [
        { id_evento: 1, nome: 'Semana de TI' },
        { id_evento: 2, nome: 'Workshop Agro' },
      ];
      mockEventoService.findAll.mockResolvedValue(events);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(events);
    });
  });

  describe('findOne', () => {
    it('should return a single event by id', async () => {
      const event = { id_evento: 4, nome: 'Simpósio' };
      mockEventoService.findById.mockResolvedValue(event);

      const result = await controller.findOne('4');

      expect(service.findById).toHaveBeenCalledWith(4);
      expect(result).toEqual(event);
    });
  });

  describe('findBySlug', () => {
    it('should return a single event by slug', async () => {
      const event = { id_evento: 5, nome: 'Festa anual', slug: 'festa-anual' };
      mockEventoService.findBySlug.mockResolvedValue(event);

      const result = await controller.findBySlug('festa-anual');

      expect(service.findBySlug).toHaveBeenCalledWith('festa-anual');
      expect(result).toEqual(event);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const dto: EventoDTO = {
        nome: 'Evento Atualizado',
        data_inicio: new Date(),
        data_fim: new Date(),
        ano: 2027,
      };

      mockEventoService.update.mockResolvedValue({ id_evento: 10, ...dto });

      const result = await controller.update('10', dto, null as any);

      expect(service.update).toHaveBeenCalledWith(10, dto);
      expect(result).toEqual({ id_evento: 10, ...dto });
    });
  });

  describe('delete', () => {
    it('should delete an event', async () => {
      mockEventoService.delete.mockResolvedValue({ success: true });

      const result = await controller.delete('15');

      expect(service.delete).toHaveBeenCalledWith(15);
      expect(result).toEqual({ success: true });
    });
  });
});
