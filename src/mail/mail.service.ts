import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(MailService.name);

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendPasswordRecoveryEmail(email: string, resetUrl: string) {
        const mailOptions = {
            from: `"IF Eventos" <${process.env.EMAIL_USER || 'noreply@eventos.com'}>`,
            to: email,
            subject: 'Recuperação de Senha - IF Eventos',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4a5568;">Recuperação de Senha</h2>
                <p>Você solicitou a recuperação da sua senha. Clique no botão abaixo para criar uma nova senha:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Redefinir Senha</a>
                </div>
                <p>Ou copie e cole a URL abaixo em seu navegador:</p>
                <p style="word-break: break-all; color: #718096; font-size: 14px;">${resetUrl}</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 12px; color: #a0aec0;">Este link expira em 1 hora. Se você não solicitou esta alteração, pode ignorar este e-mail.</p>
            </div>
        `,
        };

        try {
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
                this.logger.warn(`Variáveis de ambiente de e-mail ausentes. Mock enviando link: ${resetUrl}`);
                return;
            }
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`E-mail de recuperação enviado para ${email}`);
        } catch (error: any) {
            this.logger.error(`Erro ao enviar e-mail para ${email}`, error.stack);
            throw new Error('Erro ao enviar e-mail de recuperação');
        }
    }
}
