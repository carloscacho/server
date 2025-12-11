import { BadRequestException } from '@nestjs/common';
import { RegisterUsuarioUseCase } from './register-usuario.use-case';
import { IUsuarioRepository } from '../../domain/repositories/usuario.repository.interface';
import { Usuario } from '../../domain/entities/usuario.entity';

describe('RegisterUsuarioUseCase', () => {
    let useCase: RegisterUsuarioUseCase;
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

        useCase = new RegisterUsuarioUseCase(mockRepository);
    });

    const validInput = {
        nome: 'João Silva',
        email: 'joao@example.com',
        cpf: '12345678901',
        senha: 'senha123',
        comunidade: 'Comunidade A',
    };

    it('should register a new user successfully', async () => {
        mockRepository.findByCpf.mockResolvedValue(null);
        mockRepository.findByEmail.mockResolvedValue(null);
        mockRepository.create.mockImplementation(async (usuario) =>
            Usuario.create(1, {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf,
                senha: usuario.senha,
                tipo: 2,
            })
        );
        mockRepository.createParticipante.mockResolvedValue();

        const result = await useCase.execute(validInput);

        expect(result.id).toBe(1);
        expect(result.nome).toBe('João Silva');
        expect(result.email).toBe('joao@example.com');
        expect(result.cpf).toBe('12345678901');
        expect(mockRepository.createParticipante).toHaveBeenCalledWith(1);
    });

    it('should throw error when CPF already exists', async () => {
        mockRepository.findByCpf.mockResolvedValue(
            Usuario.create(1, { ...validInput, tipo: 2 })
        );

        await expect(useCase.execute(validInput)).rejects.toThrow(BadRequestException);
        await expect(useCase.execute(validInput)).rejects.toThrow('CPF já cadastrado');
    });

    it('should throw error when email already exists', async () => {
        mockRepository.findByCpf.mockResolvedValue(null);
        mockRepository.findByEmail.mockResolvedValue(
            Usuario.create(1, { ...validInput, tipo: 2 })
        );

        await expect(useCase.execute(validInput)).rejects.toThrow(BadRequestException);
        await expect(useCase.execute(validInput)).rejects.toThrow('E-mail já cadastrado');
    });

    it('should hash the password before saving', async () => {
        mockRepository.findByCpf.mockResolvedValue(null);
        mockRepository.findByEmail.mockResolvedValue(null);
        mockRepository.create.mockImplementation(async (usuario) => {
            // Password should be hashed (not the original)
            expect(usuario.senha).not.toBe('senha123');
            expect(usuario.senha.length).toBeGreaterThan(20); // bcrypt hash length
            return Usuario.create(1, {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf,
                senha: usuario.senha,
                tipo: 2,
            });
        });
        mockRepository.createParticipante.mockResolvedValue();

        await useCase.execute(validInput);

        expect(mockRepository.create).toHaveBeenCalled();
    });

    it('should set tipo as 2 (participante) for new users', async () => {
        mockRepository.findByCpf.mockResolvedValue(null);
        mockRepository.findByEmail.mockResolvedValue(null);
        mockRepository.create.mockImplementation(async (usuario) => {
            expect(usuario.tipo).toBe(2);
            return Usuario.create(1, {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf,
                senha: usuario.senha,
                tipo: usuario.tipo,
            });
        });
        mockRepository.createParticipante.mockResolvedValue();

        await useCase.execute(validInput);

        expect(mockRepository.create).toHaveBeenCalled();
    });
});
