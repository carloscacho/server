import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsuarioDTO, AlterarSenhaDTO, UpdateUsuarioDTO } from './dto/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  private removePassword(user: any) {
    const { senha, ...result } = user;
    return result;
  }

  // Cadastrar Usuário
  async create(data: UsuarioDTO) {
    try {
      // O 'tipo' é extraído do 'data' para ser ignorado, garantindo que o valor fixo 2 seja sempre usado.
      const { senha, cpf, email, tipo, ...rest } = data;

      // Verificar se CPF ou email já existem
      const cpfExists = await this.prisma.usuario.findUnique({
        where: { cpf },
      });
      const emailExists = await this.prisma.usuario.findUnique({
        where: { email },
      });

      if (cpfExists || emailExists) {
        throw new BadRequestException('CPF ou E-MAIL já cadastrados');
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Criar usuário
      const user = await this.prisma.usuario.create({
        data: {
          nome: rest.nome,
          cpf,
          email,
          senha: hashedPassword,
          tipo: 2, // O tipo de um novo usuário é sempre 2 (participante).
          comunidade: rest.comunidade || null,
          instituicao: rest.instituicao || null,
          ra: rest.ra || null,
        },
      });

      // Se for participante, criar registro na tabela de participantes
      await this.prisma.participante.create({
        data: { fk_usuario: user.id_usuario },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('CPF ou E-MAIL já cadastrados');
      }
      throw error;
    }
  }

  // Atualizar Usuário
  async update(id_usuario: number, data: UpdateUsuarioDTO) {
    const { senha, ...rest } = data;

    // Hash da senha, se fornecida
    let hashedPassword: string | undefined;
    if (senha) {
      hashedPassword = await bcrypt.hash(senha, 10);
    }

    const user = await this.prisma.usuario.update({
      where: { id_usuario },
      data: {
        ...rest,
        ...(hashedPassword && { senha: hashedPassword }),
        tipo: rest.tipo || null, // Tratar campos opcionais
        comunidade: rest.comunidade || null,
        instituicao: rest.instituicao || null,
        ra: rest.ra || null,
      },
    });

    return user;
  }

  // Validar CPF
  async testeCpf(cpf: string) {
    const user = await this.prisma.usuario.findUnique({ where: { cpf } });

    if (user) {
      return {
        message: `CPF já cadastrado. Email associado: ${user.email}`,
        status: 'warning',
      };
    }

    return { message: 'CPF disponível para cadastro', status: 'success' };
  }

  // Alterar Senha
  async alterarSenha(idUsuarioLogado: number, data: AlterarSenhaDTO) {
    const { senha, confsenha } = data;

    if (senha !== confsenha) {
      throw new BadRequestException('As senhas não conferem.');
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { id_usuario: idUsuarioLogado },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com ID ${idUsuarioLogado} não encontrado.`,
      );
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    await this.prisma.usuario.update({
      where: { id_usuario: idUsuarioLogado },
      data: { senha: hashedPassword },
    });

    return { message: 'Senha alterada com sucesso.' };
  }

  async findAll() {
    const users = await this.prisma.usuario.findMany();
    return users.map(this.removePassword);
  }

  async findById(id_usuario: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${id_usuario} não encontrado`,
      );
    }

    return this.removePassword(user);
  }

  async delete(id_usuario: number) {
    try {
      const user = await this.prisma.usuario.delete({ where: { id_usuario } });
      return this.removePassword(user);
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Não é possível deletar este usuário pois ele está vinculado a outros registros.');
      }
      throw error;
    }
  }

  async findByEmail(email: string, includePassword = false) {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }

    if (!includePassword) {
      return this.removePassword(user);
    }

    return user;
  }
}
