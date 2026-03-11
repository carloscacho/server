import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUsuarioRepository, USUARIO_REPOSITORY } from '../../domain/repositories/usuario.repository.interface';
import { MailService } from '../../../mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class RequestPasswordResetUseCase {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository,
        private readonly mailService: MailService,
    ) { }

    async execute(cpfOrEmail: string, resetUrlPrefix: string): Promise<void> {
        let usuario = await this.usuarioRepository.findByCpf(cpfOrEmail);
        if (!usuario) {
            usuario = await this.usuarioRepository.findByEmail(cpfOrEmail);
        }

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado com os dados fornecidos');
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        await this.usuarioRepository.updateResetToken(usuario.id, token, expires);

        const resetUrl = `${resetUrlPrefix}?token=${token}`;

        await this.mailService.sendPasswordRecoveryEmail(usuario.email, resetUrl);
    }
}
