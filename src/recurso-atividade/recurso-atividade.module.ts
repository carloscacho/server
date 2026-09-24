import { Module } from '@nestjs/common';
import { RecursoAtividadeController } from './recurso-atividade.controller';
import { RecursoAtividadeService } from './recurso-atividade.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [RecursoAtividadeController],
  providers: [RecursoAtividadeService, PrismaService]
})
export class RecursoAtividadeModule {}
