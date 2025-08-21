import { Module } from '@nestjs/common';
import { DataAtividadeParticipanteService } from './data-atividade-participante.service';
import { DataAtividadeParticipanteController } from './data-atividade-participante.controller';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DataAtividadeParticipanteService],
  controllers: [DataAtividadeParticipanteController],
})
export class DataAtividadeParticipanteModule {}