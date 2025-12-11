import { Module } from '@nestjs/common';
import { PalestranteService } from './palestrante.service';
import { PalestranteController } from './palestrante.controller';
import { PrismaModule } from '../database/prisma.module';

// DDD imports
import { PALESTRANTE_REPOSITORY } from './domain/repositories/palestrante.repository.interface';
import { PrismaPalestranteRepository } from './infrastructure/repositories/prisma-palestrante.repository';
import { CreatePalestranteUseCase } from './application/use-cases/create-palestrante.use-case';
import { DeletePalestranteUseCase } from './application/use-cases/delete-palestrante.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    PalestranteService,
    {
      provide: PALESTRANTE_REPOSITORY,
      useClass: PrismaPalestranteRepository,
    },
    CreatePalestranteUseCase,
    DeletePalestranteUseCase,
  ],
  controllers: [PalestranteController],
  exports: [
    PalestranteService,
    CreatePalestranteUseCase,
    DeletePalestranteUseCase,
  ],
})
export class PalestranteModule { }
