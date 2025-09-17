import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy'; // Importar a estratégia local

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'default_secret', // Use uma variável de ambiente
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' }, // Tempo de expiração configurável
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy], // Registrar a estratégia local
  controllers: [AuthController],
})
export class AuthModule {}
