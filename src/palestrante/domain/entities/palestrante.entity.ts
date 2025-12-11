import { Entity } from '../../../@core/domain/entity';

export interface PalestranteProps {
    nome: string;
    email: string;
    instituicao?: string | null;
    foto?: string | null;
    eventos?: number[];
}

/**
 * Palestrante Domain Entity
 */
export class Palestrante extends Entity<number> {
    public nome: string;
    public email: string;
    public instituicao: string | null;
    public foto: string | null;
    public eventos: number[];

    private constructor(id: number, props: PalestranteProps) {
        super(id);
        this.nome = props.nome;
        this.email = props.email;
        this.instituicao = props.instituicao ?? null;
        this.foto = props.foto ?? null;
        this.eventos = props.eventos ?? [];
    }

    static create(id: number, props: PalestranteProps): Palestrante {
        return new Palestrante(id, props);
    }

    static createNew(props: PalestranteProps): Palestrante {
        return new Palestrante(0, props);
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            instituicao: this.instituicao,
            foto: this.foto,
            eventos: this.eventos,
        };
    }
}
