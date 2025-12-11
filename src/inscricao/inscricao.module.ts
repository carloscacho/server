import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';

// DDD imports
import { INSCRICAO_REPOSITORY } from './domain/repositories/inscricao.repository.interface';
import { PrismaInscricaoRepository } from './infrastructure/repositories/prisma-inscricao.repository';
import { SubscribeToActivityUseCase } from './application/use-cases/subscribe-to-activity.use-case';
import { UnsubscribeFromActivityUseCase } from './application/use-cases/unsubscribe-from-activity.use-case';

@Module({
    imports: [PrismaModule],
    providers: [
        // Repository (DI)
        {
            provide: INSCRICAO_REPOSITORY,
            useClass: PrismaInscricaoRepository,
        },
        // Use Cases
        SubscribeToActivityUseCase,
        UnsubscribeFromActivityUseCase,
    ],
    exports: [
        SubscribeToActivityUseCase,
        UnsubscribeFromActivityUseCase,
    ],
})
export class InscricaoModule { }
