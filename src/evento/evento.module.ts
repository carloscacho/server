import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { PrismaModule } from '../database/prisma.module';

// Clean Architecture / DDD imports
import { EVENTO_REPOSITORY } from './domain/repositories/evento.repository.interface';
import { PrismaEventoRepository } from './infrastructure/repositories/prisma-evento.repository';
import { CreateEventoUseCase } from './application/use-cases/create-evento.use-case';
import { UpdateEventoUseCase } from './application/use-cases/update-evento.use-case';
import { DeleteEventoUseCase } from './application/use-cases/delete-evento.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    EventoService,
    // Repository (DI)
    {
      provide: EVENTO_REPOSITORY,
      useClass: PrismaEventoRepository,
    },
    // Use Cases
    CreateEventoUseCase,
    UpdateEventoUseCase,
    DeleteEventoUseCase,
  ],
  controllers: [EventoController],
  exports: [
    EventoService,
    CreateEventoUseCase,
    UpdateEventoUseCase,
    DeleteEventoUseCase,
  ],
})
export class EventoModule { }
