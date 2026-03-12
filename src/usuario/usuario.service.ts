import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsuarioDTO, AlterarSenhaDTO, UpdateUsuarioDTO, RegisterAndSubscribeDTO } from './dto/usuario.dto';
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
      // O 'vinculo' é extraído para salvar. O 'tipo' (papel do sistema) é fixo como 2.
      const { senha, cpf, email, vinculo, ...rest } = data;

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
          vinculo: vinculo || null,
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
        vinculo: rest.vinculo || null, // Tratar campos opcionais
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

  // Checar registro do usuário no evento
  async checkRegistration(cpf: string, id_evento: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { cpf },
      include: {
        participante: {
          include: {
            evento_participante: {
              where: { fk_evento: id_evento },
            },
          },
        },
      },
    });

    if (!user) {
      return { status: 'not_found', message: 'Usuário não encontrado.' };
    }

    const participante = user.participante[0];
    if (participante && participante.evento_participante.length > 0) {
      return { status: 'already_registered', message: 'Usuário já está inscrito neste evento.' };
    }

    const { senha, ...userData } = user;
    return { status: 'exists_not_registered', user: userData };
  }

  // Completo: Registrar/Atualizar e Inscrever
  async registerAndSubscribe(data: RegisterAndSubscribeDTO) {
    let user: any = await this.prisma.usuario.findUnique({
      where: { cpf: data.cpf },
      include: { participante: true }
    });

    if (user) {
      // Usuário existente - Exige senhaAtual
      if (!data.senhaAtual) {
        throw new UnauthorizedException('Senha atual é obrigatória para confirmar a atualização de dados.');
      }
      const senhaValida = await bcrypt.compare(data.senhaAtual, user.senha);
      if (!senhaValida) {
        throw new UnauthorizedException('Senha atual incorreta.');
      }

      // Atualiza os dados
      // @ts-ignore
      user = await this.prisma.usuario.update({
        where: { id_usuario: user.id_usuario },
        data: {
          nome: data.nome,
          email: data.email,
          vinculo: data.vinculo,
          ra: data.ra || null,
          siape: data.siape || null,
          instituicao: data.instituicao || null,
        },
        include: { participante: true }
      });
    } else {
      // Usuário novo - Exige senha
      if (!data.senha) {
        throw new BadRequestException('A senha é obrigatória para novos cadastros.');
      }
      const emailExists = await this.prisma.usuario.findUnique({ where: { email: data.email } });
      if (emailExists) {
        throw new BadRequestException('E-MAIL já cadastrado por outro usuário.');
      }
      const hashedPassword = await bcrypt.hash(data.senha, 10);
      // @ts-ignore
      user = await this.prisma.usuario.create({
        data: {
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          senha: hashedPassword,
          tipo: 2, // papel do sistema base
          vinculo: data.vinculo,
          ra: data.ra || null,
          siape: data.siape || null,
          instituicao: data.instituicao || null,
        },
        include: { participante: true }
      });
    }

    // Garante que existe participante
    let id_participante: number;
    if (user!.participante && user!.participante.length > 0) {
      id_participante = user!.participante[0].id_participante;
    } else {
      const part = await this.prisma.participante.create({
        data: { fk_usuario: user!.id_usuario }
      });
      id_participante = part.id_participante;
    }

    // Inscreve no evento (ignora erro se já inscrito)
    try {
      await this.prisma.evento_participante.create({
        data: {
          fk_evento: data.id_evento,
          fk_participante: id_participante
        }
      });
    } catch (e) {
      if (e.code === 'P2002') {
        // Já inscrito, ignora
      } else {
        throw e;
      }
    }

    return { message: 'Inscrição realizada com sucesso!', user: this.removePassword(user) };
  }

  // Alterar Senha
  async alterarSenha(id_usuario: number, data: AlterarSenhaDTO) {
    // Buscar o usuário
    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se a senha atual está correta
    const senhaValida = await bcrypt.compare(data.senhaAtual, user.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    // Hash da nova senha
    const novaSenhaHash = await bcrypt.hash(data.novaSenha, 10);

    // Atualizar a senha
    await this.prisma.usuario.update({
      where: { id_usuario },
      data: { senha: novaSenhaHash },
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
      include: { participante: true },
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
