import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) { }

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

    // Access token: 30 horas (usa configuração do módulo)
    const accessToken = this.jwtService.sign(payload);

    // Refresh token: 5 dias
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION || '5d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 108000, // 30 horas em segundos
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        tipo: user.tipo,
        instituicao: user.instituicao,
        comunidade: user.comunidade,
        ra: user.ra,
        participante: user.participante,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      // Gerar novo access token
      const newAccessToken = this.jwtService.sign({
        email: payload.email,
        sub: payload.sub,
        tipo: payload.tipo,
      });

      return {
        access_token: newAccessToken,
        expires_in: 108000, // 30 horas em segundos
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }
}

