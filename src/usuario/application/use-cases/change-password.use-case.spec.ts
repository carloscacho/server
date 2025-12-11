import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordUseCase } from './change-password.use-case';
import { IUsuarioRepository } from '../../domain/repositories/usuario.repository.interface';
import { Usuario } from '../../domain/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

describe('ChangePasswordUseCase', () => {
    let useCase: ChangePasswordUseCase;
    let mockRepository: jest.Mocked<IUsuarioRepository>;

    beforeEach(() => {
        mockRepository = {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findByCpf: jest.fn(),
            create: jest.fn(),
            updatePassword: jest.fn(),
            createParticipante: jest.fn(),
        };

        useCase = new ChangePasswordUseCase(mockRepository);
    });

    it('should change password successfully', async () => {
        const currentPassword = 'senha123';
        const hashedCurrentPassword = await bcrypt.hash(currentPassword, 10);

        const existingUser = Usuario.create(1, {
            nome: 'João',
            email: 'joao@example.com',
            cpf: '12345678901',
            senha: hashedCurrentPassword,
            tipo: 2,
        });

        mockRepository.findById.mockResolvedValue(existingUser);
        mockRepository.updatePassword.mockResolvedValue();

        const result = await useCase.execute({
            userId: 1,
            currentPassword: 'senha123',
            newPassword: 'novaSenha456',
        });

        expect(result.success).toBe(true);
        expect(result.message).toBe('Senha alterada com sucesso');
        expect(mockRepository.updatePassword).toHaveBeenCalledWith(
            1,
            expect.any(String)
        );
    });

    it('should throw error when user not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(
            useCase.execute({
                userId: 999,
                currentPassword: 'senha123',
                newPassword: 'novaSenha456',
            })
        ).rejects.toThrow(NotFoundException);
    });

    it('should throw error when current password is incorrect', async () => {
        const hashedPassword = await bcrypt.hash('senhaCorreta', 10);

        const existingUser = Usuario.create(1, {
            nome: 'João',
            email: 'joao@example.com',
            cpf: '12345678901',
            senha: hashedPassword,
            tipo: 2,
        });

        mockRepository.findById.mockResolvedValue(existingUser);

        await expect(
            useCase.execute({
                userId: 1,
                currentPassword: 'senhaErrada',
                newPassword: 'novaSenha456',
            })
        ).rejects.toThrow(UnauthorizedException);
    });

    it('should hash the new password before saving', async () => {
        const currentPassword = 'senha123';
        const hashedCurrentPassword = await bcrypt.hash(currentPassword, 10);

        const existingUser = Usuario.create(1, {
            nome: 'João',
            email: 'joao@example.com',
            cpf: '12345678901',
            senha: hashedCurrentPassword,
            tipo: 2,
        });

        mockRepository.findById.mockResolvedValue(existingUser);
        mockRepository.updatePassword.mockImplementation(async (id, newPassword) => {
            // New password should be hashed
            expect(newPassword).not.toBe('novaSenha456');
            expect(newPassword.length).toBeGreaterThan(20);
        });

        await useCase.execute({
            userId: 1,
            currentPassword: 'senha123',
            newPassword: 'novaSenha456',
        });

        expect(mockRepository.updatePassword).toHaveBeenCalled();
    });
});
