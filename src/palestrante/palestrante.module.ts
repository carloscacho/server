import { Module } from '@nestjs/common';
import { PalestranteService } from './palestrante.service';
import { PalestranteController } from './palestrante.controller';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PalestranteService],
  controllers: [PalestranteController],
})
export class PalestranteModule {}
