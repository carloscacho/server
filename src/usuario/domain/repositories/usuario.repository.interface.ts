import { Usuario } from '../entities/usuario.entity';

/**
 * Usuario Repository Interface - defines the contract for data access
 * Following the Dependency Inversion Principle
 */
export interface IUsuarioRepository {
    findById(id: number): Promise<Usuario | null>;
    findByEmail(email: string): Promise<Usuario | null>;
    findByCpf(cpf: string): Promise<Usuario | null>;
    create(usuario: Usuario): Promise<Usuario>;
    updatePassword(id: number, hashedPassword: string): Promise<void>;
    createParticipante(userId: number): Promise<void>;
}

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');
