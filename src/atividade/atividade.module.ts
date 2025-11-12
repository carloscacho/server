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
export class AtividadeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware) // Aplica o middleware de admin
      .exclude({ path: 'atividade', method: RequestMethod.GET },          // GET /atividade
        { path: 'atividade/:id', method: RequestMethod.GET },       // GET /atividade/:id
        { path: 'atividade/full/:id', method: RequestMethod.GET }   // GET /atividade/full/:id) // Exclui as rotas públicas
      )
        .forRoutes(AtividadeController); // Aplica às demais rotas do controller
  }
}


