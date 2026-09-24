import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Req,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO, AlterarSenhaDTO, TesteCpfDTO, UpdateUsuarioDTO, RegisterAndSubscribeDTO } from './dto/usuario.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ChangePasswordUseCase } from './application/use-cases/change-password.use-case';
import { RequestPasswordResetUseCase } from './application/use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { RequestPasswordResetDto, ResetPasswordDto } from './dto/password-reset.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) { }

  // Cadastrar Usuário
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: UsuarioDTO) {
    return this.usuarioService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // Atualizar Perfil (próprio usuário)
  @UseGuards(JwtAuthGuard)
  @Put('perfil')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updatePerfil(@Body() data: UpdateUsuarioDTO, @Req() req: Request) {
    const idUsuarioLogado = (req.user as any).id_usuario;
    return this.usuarioService.update(idUsuarioLogado, data);
  }

  // Alterar Senha (usando Use Case)
  @UseGuards(JwtAuthGuard)
  @Put('alterar-senha')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async alterarSenha(@Body() data: AlterarSenhaDTO, @Req() req: Request) {
    const idUsuarioLogado = (req.user as any).id_usuario;
    return this.changePasswordUseCase.execute({
      userId: idUsuarioLogado,
      currentPassword: data.senhaAtual,
      newPassword: data.novaSenha,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userLogado = req.user as any;
    if (userLogado.tipo !== 1 && userLogado.id_usuario !== id) {
      throw new ForbiddenException('Você não tem permissão para acessar os dados deste usuário.');
    }
    return this.usuarioService.findById(id);
  }

  // Atualizar Usuário
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUsuarioDTO,
  ) {
    return this.usuarioService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.delete(id);
  }

  // Validar CPF
  @Post('teste-cpf')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async testeCpf(@Body() data: TesteCpfDTO) {
    return this.usuarioService.testeCpf(data.cpf);
  }

  // Verificar status de inscrição em um evento
  @Get('check-registration/:cpf/evento/:id_evento')
  async checkRegistration(
    @Param('cpf') cpf: string,
    @Param('id_evento', ParseIntPipe) id_evento: number,
  ) {
    return this.usuarioService.checkRegistration(cpf, id_evento);
  }

  // Fluxo completo de cadastro e inscrição
  @Post('register-and-subscribe')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registerAndSubscribe(@Body() data: RegisterAndSubscribeDTO) {
    return this.usuarioService.registerAndSubscribe(data);
  }

  // Solicitar recuperação de senha
  @Post('request-password-reset')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async requestPasswordReset(@Body() data: RequestPasswordResetDto) {
    await this.requestPasswordResetUseCase.execute(data.cpfOrEmail, data.resetUrlPrefix);
    return { message: 'Se os dados estiverem corretos, um e-mail de recuperação será enviado.' };
  }

  // Redefinir senha com token
  @Post('reset-password')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async resetPassword(@Body() data: ResetPasswordDto) {
    await this.resetPasswordUseCase.execute(data.token, data.newPassword);
    return { message: 'Senha redefinida com sucesso.' };
  }
}
