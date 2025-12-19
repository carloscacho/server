import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioDTO } from '../usuario/dto/usuario.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() data: UsuarioDTO) {
    this.logger.log(`Registrando novo usuário: ${data.email}`);
    return this.usuarioService.create(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Request() req) {
    this.logger.log(`Usuário logando: ${req.user.email}`);
    return this.authService.login(req.user);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    this.logger.log('Renovando access token');
    return this.authService.refreshToken(refreshToken);
  }
}

