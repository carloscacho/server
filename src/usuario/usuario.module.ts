import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from '../database/prisma.module';
import { AdminMiddleware } from '../common/middlewares/admin.middleware';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';

@Module({
  imports: [PrismaModule],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: 'usuario', method: RequestMethod.POST },
        { path: 'usuario/teste-cpf', method: RequestMethod.POST },
        { path: 'usuario/alterar-senha', method: RequestMethod.PUT },
      )
      .forRoutes(UsuarioController);

    // Aplica o middleware de autenticação (qualquer usuário logado)
    // especificamente para a rota de alterar senha.
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'usuario/alterar-senha', method: RequestMethod.PUT });
  }
}
