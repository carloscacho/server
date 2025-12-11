import { Entity } from '../../../@core/domain/entity';

export interface TurmaProps {
    nome: string;
}

export class Turma extends Entity<number> {
    public nome: string;

    private constructor(id: number, props: TurmaProps) {
        super(id);
        this.nome = props.nome;
    }

    static create(id: number, props: TurmaProps): Turma {
        return new Turma(id, props);
    }
}
