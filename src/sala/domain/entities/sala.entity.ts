import { Entity } from '../../../@core/domain/entity';

export interface SalaProps {
    nome: string;
}

export class Sala extends Entity<number> {
    public nome: string;

    private constructor(id: number, props: SalaProps) {
        super(id);
        this.nome = props.nome;
    }

    static create(id: number, props: SalaProps): Sala {
        return new Sala(id, props);
    }
}
