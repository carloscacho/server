import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.usuarioService.findByEmail(email, true);

    if (user && (await bcrypt.compare(senha, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id_usuario,
      tipo: user.tipo,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    };
  }
}
