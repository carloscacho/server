import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IUsuarioRepository,
    USUARIO_REPOSITORY
} from '../../domain/repositories/usuario.repository.interface';
import { Usuario } from '../../domain/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

export interface RegisterUsuarioInput {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
    comunidade?: string;
    instituicao?: string;
    ra?: number;
}

export interface RegisterUsuarioOutput {
    id: number;
    nome: string;
    email: string;
    cpf: string;
}

@Injectable()
export class RegisterUsuarioUseCase
    implements IUseCase<RegisterUsuarioInput, RegisterUsuarioOutput> {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository,
    ) { }

    async execute(input: RegisterUsuarioInput): Promise<RegisterUsuarioOutput> {
        // 1. Check if CPF already exists
        const existingByCpf = await this.usuarioRepository.findByCpf(input.cpf);
        if (existingByCpf) {
            throw new BadRequestException('CPF já cadastrado');
        }

        // 2. Check if email already exists
        const existingByEmail = await this.usuarioRepository.findByEmail(input.email);
        if (existingByEmail) {
            throw new BadRequestException('E-mail já cadastrado');
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(input.senha, 10);

        // 4. Create domain entity
        const usuario = Usuario.createNew({
            nome: input.nome,
            email: input.email,
            cpf: input.cpf,
            senha: hashedPassword,
            comunidade: input.comunidade,
            instituicao: input.instituicao,
            ra: input.ra,
        });

        // 5. Persist
        const created = await this.usuarioRepository.create(usuario);

        // 6. Create participante
        await this.usuarioRepository.createParticipante(created.id);

        return {
            id: created.id,
            nome: created.nome,
            email: created.email,
            cpf: created.cpf,
        };
    }
}
