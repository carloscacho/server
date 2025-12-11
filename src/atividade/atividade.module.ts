import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeController } from './atividade.controller';
import { PrismaModule } from '../database/prisma.module';
import { AdminMiddleware } from '../common/middlewares/admin.middleware';

// Clean Architecture / DDD imports
import { ATIVIDADE_REPOSITORY } from './domain/repositories/atividade.repository.interface';
import { PrismaAtividadeRepository } from './infrastructure/repositories/prisma-atividade.repository';
import { CreateAtividadeUseCase } from './application/use-cases/create-atividade.use-case';
import { UpdateAtividadeUseCase } from './application/use-cases/update-atividade.use-case';
import { DeleteAtividadeUseCase } from './application/use-cases/delete-atividade.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    AtividadeService,
    // Repository (DI)
    {
      provide: ATIVIDADE_REPOSITORY,
      useClass: PrismaAtividadeRepository,
    },
    // Use Cases
    CreateAtividadeUseCase,
    UpdateAtividadeUseCase,
    DeleteAtividadeUseCase,
  ],
  controllers: [AtividadeController],
  exports: [
    AtividadeService,
    CreateAtividadeUseCase,
    UpdateAtividadeUseCase,
    DeleteAtividadeUseCase,
  ],
})
export class AtividadeModule { }



