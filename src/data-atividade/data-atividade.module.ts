import { Module } from '@nestjs/common';
import { DataAtividadeService } from './data-atividade.service';
import { DataAtividadeController } from './data-atividade.controller';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DataAtividadeService],
  controllers: [DataAtividadeController],
})
export class DataAtividadeModule {}
