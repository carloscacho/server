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
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO, AlterarSenhaDTO, TesteCpfDTO, UpdateUsuarioDTO } from './dto/usuario.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ChangePasswordUseCase } from './application/use-cases/change-password.use-case';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) { }

  // Cadastrar Usuário
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: UsuarioDTO) {
    return this.usuarioService.create(data);
  }

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
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
}
