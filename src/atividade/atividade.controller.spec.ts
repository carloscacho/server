import { Test, TestingModule } from '@nestjs/testing';
import { AtividadeController } from './atividade.controller';
import { AtividadeService } from './atividade.service';
import { AtividadeDTO } from './dto/atividade.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('AtividadeController', () => {
  let controller: AtividadeController;
  let service: AtividadeService;

  const mockAtividadeService = {
    create: jest.fn(),
    createBatch: jest.fn(),
    findAll: jest.fn(),
    findAllFullInfosById: jest.fn(),
    findAllFullInfos: jest.fn(),
    inscreverParticipantesPorEmail: jest.fn(),
    findByIdWithParticipants: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtividadeController],
      providers: [
        {
          provide: AtividadeService,
          useValue: mockAtividadeService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AtividadeController>(AtividadeController);
    service = module.get<AtividadeService>(AtividadeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an activity', async () => {
      const dto: AtividadeDTO = {
        nome: 'Oficina Git',
        descricao: 'Git para iniciantes',
        limite: 20,
        fk_evento: 1,
      };

      mockAtividadeService.create.mockResolvedValue({ id_atividade: 10, ...dto });

      const result = await controller.create(dto, { user: { id_usuario: 1, tipo: 1 } });

      expect(service.create).toHaveBeenCalledWith(dto, 1, 1);
      expect(result).toEqual({ id_atividade: 10, ...dto });
    });
  });

  describe('createBatch', () => {
    it('should call createBatch with a list of activities', async () => {
      const activities: AtividadeDTO[] = [
        { nome: 'Palestra A', fk_evento: 1 },
        { nome: 'Palestra B', fk_evento: 1 },
      ];

      mockAtividadeService.createBatch.mockResolvedValue({ count: 2 });

      const result = await controller.createBatch({ atividades: activities }, { user: { id_usuario: 1, tipo: 1 } });

      expect(service.createBatch).toHaveBeenCalledWith(activities, 1, 1);
      expect(result).toEqual({ count: 2 });
    });
  });

  describe('findAll', () => {
    it('should return all activities', async () => {
      const list = [{ id_atividade: 1, nome: 'Workshop' }];
      mockAtividadeService.findAll.mockResolvedValue(list);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(list);
    });
  });

  describe('findAllFullInfosById', () => {
    it('should return all full info for a specific event', async () => {
      const list = [{ id_atividade: 2, nome: 'Mesa redonda', fk_evento: 5 }];
      mockAtividadeService.findAllFullInfosById.mockResolvedValue(list);

      const result = await controller.findAllFullInfosById('5');

      expect(service.findAllFullInfosById).toHaveBeenCalledWith(5);
      expect(result).toEqual(list);
    });
  });

  describe('findAllFullInfos', () => {
    it('should return all activities with full info', async () => {
      const list = [{ id_atividade: 3, nome: 'Painel' }];
      mockAtividadeService.findAllFullInfos.mockResolvedValue(list);

      const result = await controller.findAllFullInfos();

      expect(service.findAllFullInfos).toHaveBeenCalled();
      expect(result).toEqual(list);
    });
  });

  describe('inscreverParticipantes', () => {
    it('should register participants by email', async () => {
      const emails = ['user1@mail.com', 'user2@mail.com'];
      mockAtividadeService.inscreverParticipantesPorEmail.mockResolvedValue({ enrolled: 2 });

      const result = await controller.inscreverParticipantes('12', { emails });

      expect(service.inscreverParticipantesPorEmail).toHaveBeenCalledWith(12, emails);
      expect(result).toEqual({ enrolled: 2 });
    });
  });

  describe('findByIdWithParticipants', () => {
    it('should return an activity details with its list of participants', async () => {
      const activityDetails = { id_atividade: 7, nome: 'Coding Night', participantes: [] };
      mockAtividadeService.findByIdWithParticipants.mockResolvedValue(activityDetails);

      const result = await controller.findByIdWithParticipants('7');

      expect(service.findByIdWithParticipants).toHaveBeenCalledWith(7);
      expect(result).toEqual(activityDetails);
    });
  });

  describe('findOne', () => {
    it('should return a single activity by id', async () => {
      const activity = { id_atividade: 8, nome: 'Intro Go' };
      mockAtividadeService.findById.mockResolvedValue(activity);

      const result = await controller.findOne('8');

      expect(service.findById).toHaveBeenCalledWith(8);
      expect(result).toEqual(activity);
    });

    it('should fall back to findAllFullInfos if id parameter is "full"', async () => {
      const fullList = [{ id_atividade: 9, nome: 'Full Info Activity' }];
      mockAtividadeService.findAllFullInfos.mockResolvedValue(fullList);

      const result = await controller.findOne('full-list');

      expect(service.findAllFullInfos).toHaveBeenCalled();
      expect(result).toEqual(fullList);
    });
  });

  describe('update', () => {
    it('should update an activity by id', async () => {
      const dto: AtividadeDTO = { nome: 'Atividade Modificada', fk_evento: 1 };
      mockAtividadeService.update.mockResolvedValue({ id_atividade: 20, ...dto });

      const result = await controller.update('20', dto, { user: { id_usuario: 1, tipo: 1 } });

      expect(service.update).toHaveBeenCalledWith(20, dto, 1, 1);
      expect(result).toEqual({ id_atividade: 20, ...dto });
    });
  });

  describe('delete', () => {
    it('should delete an activity by id', async () => {
      mockAtividadeService.delete.mockResolvedValue({ success: true });

      const result = await controller.delete('30', { user: { id_usuario: 1, tipo: 1 } });

      expect(service.delete).toHaveBeenCalledWith(30, 1, 1);
      expect(result).toEqual({ success: true });
    });
  });
});
