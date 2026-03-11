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
import { MailModule } from '../mail/mail.module';

// Clean Architecture / DDD imports
import { USUARIO_REPOSITORY } from './domain/repositories/usuario.repository.interface';
import { PrismaUsuarioRepository } from './infrastructure/repositories/prisma-usuario.repository';
import { RegisterUsuarioUseCase } from './application/use-cases/register-usuario.use-case';
import { ChangePasswordUseCase } from './application/use-cases/change-password.use-case';
import { RequestPasswordResetUseCase } from './application/use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';

@Module({
  imports: [PrismaModule, MailModule],
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
    RequestPasswordResetUseCase,
    ResetPasswordUseCase,
  ],
  controllers: [UsuarioController],
  exports: [UsuarioService, RegisterUsuarioUseCase, ChangePasswordUseCase, RequestPasswordResetUseCase, ResetPasswordUseCase],
})
export class UsuarioModule { }
