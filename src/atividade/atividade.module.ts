import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeController } from './atividade.controller';
import { PrismaModule } from '../database/prisma.module';
import { AdminMiddleware } from '../common/middlewares/admin.middleware';

@Module({
  imports: [PrismaModule],
  providers: [AtividadeService],
  controllers: [AtividadeController],
})
export class AtividadeModule { }


