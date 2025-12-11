import {
    Injectable,
    Inject,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import {
    IUsuarioRepository,
    USUARIO_REPOSITORY
} from '../../domain/repositories/usuario.repository.interface';
import * as bcrypt from 'bcrypt';

export interface ChangePasswordInput {
    userId: number;
    currentPassword: string;
    newPassword: string;
}

export interface ChangePasswordOutput {
    success: boolean;
    message: string;
}

@Injectable()
export class ChangePasswordUseCase
    implements IUseCase<ChangePasswordInput, ChangePasswordOutput> {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository,
    ) { }

    async execute(input: ChangePasswordInput): Promise<ChangePasswordOutput> {
        // 1. Find user
        const usuario = await this.usuarioRepository.findById(input.userId);
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        // 2. Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(
            input.currentPassword,
            usuario.senha
        );
        if (!isCurrentPasswordValid) {
            throw new UnauthorizedException('Senha atual incorreta');
        }

        // 3. Hash new password
        const hashedNewPassword = await bcrypt.hash(input.newPassword, 10);

        // 4. Update password
        await this.usuarioRepository.updatePassword(input.userId, hashedNewPassword);

        return {
            success: true,
            message: 'Senha alterada com sucesso',
        };
    }
}
