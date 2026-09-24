import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'login', passwordField: 'senha' }); // Configura os campos de login
  }

  async validate(login: string, senha: string): Promise<any> {
    const user = await this.authService.validateUser(login, senha);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }
}
