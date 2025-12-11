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

// Clean Architecture / DDD imports
import { USUARIO_REPOSITORY } from './domain/repositories/usuario.repository.interface';
import { PrismaUsuarioRepository } from './infrastructure/repositories/prisma-usuario.repository';
import { RegisterUsuarioUseCase } from './application/use-cases/register-usuario.use-case';
import { ChangePasswordUseCase } from './application/use-cases/change-password.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    UsuarioService,
    // Repository (DI)
    {
      provide: USUARIO_REPOSITORY,
      useClass: PrismaUsuarioRepository,
    },
    // Use Cases
    RegisterUsuarioUseCase,
    ChangePasswordUseCase,
  ],
  controllers: [UsuarioController],
  exports: [UsuarioService, RegisterUsuarioUseCase, ChangePasswordUseCase],
})
export class UsuarioModule { }
