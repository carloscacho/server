import { Entity } from '../../../@core/domain/entity';

export interface TurnoProps {
    nome: string;
}

export class Turno extends Entity<number> {
    public nome: string;

    private constructor(id: number, props: TurnoProps) {
        super(id);
        this.nome = props.nome;
    }

    static create(id: number, props: TurnoProps): Turno {
        return new Turno(id, props);
    }
}
