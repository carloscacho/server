import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IUsuarioRepository, USUARIO_REPOSITORY } from '../../domain/repositories/usuario.repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetPasswordUseCase {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository,
    ) { }

    async execute(token: string, newPassword: string): Promise<void> {
        const usuario = await this.usuarioRepository.findByResetToken(token);

        if (!usuario) {
            throw new BadRequestException('Token inválido ou expirado');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.usuarioRepository.updatePassword(usuario.id, hashedPassword);
        await this.usuarioRepository.updateResetToken(usuario.id, null, null);
    }
}
