import { Module } from '@nestjs/common';
import { PalestranteAtividadeService } from './palestrante-atividade.service';
import { PalestranteAtividadeController } from './palestrante-atividade.controller';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PalestranteAtividadeService],
  controllers: [PalestranteAtividadeController],
})
export class PalestranteAtividadeModule {}
