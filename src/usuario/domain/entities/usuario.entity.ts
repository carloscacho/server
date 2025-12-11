import { Entity } from '../../../@core/domain/entity';

export interface UsuarioProps {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
    tipo: number | null;
    comunidade?: string | null;
    instituicao?: string | null;
    ra?: number | null;
}

/**
 * Usuario Domain Entity
 */
export class Usuario extends Entity<number> {
    public nome: string;
    public email: string;
    public cpf: string;
    public senha: string;
    public tipo: number | null;
    public comunidade: string | null;
    public instituicao: string | null;
    public ra: number | null;

    private constructor(id: number, props: UsuarioProps) {
        super(id);
        this.nome = props.nome;
        this.email = props.email;
        this.cpf = props.cpf;
        this.senha = props.senha;
        this.tipo = props.tipo;
        this.comunidade = props.comunidade ?? null;
        this.instituicao = props.instituicao ?? null;
        this.ra = props.ra ?? null;
    }

    static create(id: number, props: UsuarioProps): Usuario {
        return new Usuario(id, props);
    }

    static createNew(props: Omit<UsuarioProps, 'tipo'>): Usuario {
        // New users are always tipo 2 (participante)
        return new Usuario(0, { ...props, tipo: 2 });
    }

    updatePassword(hashedPassword: string): void {
        this.senha = hashedPassword;
    }

    isAdmin(): boolean {
        return this.tipo === 1;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            cpf: this.cpf,
            tipo: this.tipo,
            comunidade: this.comunidade,
            instituicao: this.instituicao,
            ra: this.ra,
        };
    }
}
