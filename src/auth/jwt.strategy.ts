import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { UsuarioDTO } from 'src/usuario/dto/usuario.dto';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Controller('profile')
@Injectable()
export class ProfileController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@Request() req) {
    return req.user; // Retorna os dados do usuário autenticado
  }

  async create(data: UsuarioDTO) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    return this.prisma.usuario.create({
      data: { ...data, senha: hashedPassword },
    });
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'default_secret',
    });
  }

  async validate(payload: any) {
    return {
      id_usuario: payload.sub,
      email: payload.email,
      tipo: payload.tipo,
    };
  }
}
