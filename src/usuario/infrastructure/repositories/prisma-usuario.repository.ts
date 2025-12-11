import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IUsuarioRepository } from '../../domain/repositories/usuario.repository.interface';
import { Usuario } from '../../domain/entities/usuario.entity';

@Injectable()
export class PrismaUsuarioRepository implements IUsuarioRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: number): Promise<Usuario | null> {
        const data = await this.prisma.usuario.findUnique({
            where: { id_usuario: id },
        });

        if (!data) return null;

        return Usuario.create(data.id_usuario, {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            senha: data.senha,
            tipo: data.tipo,
            comunidade: data.comunidade,
            instituicao: data.instituicao,
            ra: data.ra,
        });
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const data = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if (!data) return null;

        return Usuario.create(data.id_usuario, {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            senha: data.senha,
            tipo: data.tipo,
            comunidade: data.comunidade,
            instituicao: data.instituicao,
            ra: data.ra,
        });
    }

    async findByCpf(cpf: string): Promise<Usuario | null> {
        const data = await this.prisma.usuario.findUnique({
            where: { cpf },
        });

        if (!data) return null;

        return Usuario.create(data.id_usuario, {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            senha: data.senha,
            tipo: data.tipo,
            comunidade: data.comunidade,
            instituicao: data.instituicao,
            ra: data.ra,
        });
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const data = await this.prisma.usuario.create({
            data: {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf,
                senha: usuario.senha,
                tipo: usuario.tipo,
                comunidade: usuario.comunidade,
                instituicao: usuario.instituicao,
                ra: usuario.ra,
            },
        });

        return Usuario.create(data.id_usuario, {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            senha: data.senha,
            tipo: data.tipo,
            comunidade: data.comunidade,
            instituicao: data.instituicao,
            ra: data.ra,
        });
    }

    async updatePassword(id: number, hashedPassword: string): Promise<void> {
        await this.prisma.usuario.update({
            where: { id_usuario: id },
            data: { senha: hashedPassword },
        });
    }

    async createParticipante(userId: number): Promise<void> {
        await this.prisma.participante.create({
            data: { fk_usuario: userId },
        });
    }
}
