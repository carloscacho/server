import { Module } from '@nestjs/common';
import { EventoParticipanteService } from './evento-participante.service';
import { EventoParticipanteController } from './evento-participante.controller';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EventoParticipanteService],
  controllers: [EventoParticipanteController],
})
export class EventoParticipanteModule {}
