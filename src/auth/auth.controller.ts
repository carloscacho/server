import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Aplica o guard ao endpoint de login
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user); // `req.user` é preenchido pelo LocalAuthGuard
  }
}
