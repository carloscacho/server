import { Entity } from '../../../@core/domain/entity';

export interface ParticipanteProps {
    fk_usuario: number;
    fk_turma?: number | null;
    fk_turno?: number | null;
    semestre?: number | null;
}

export class Participante extends Entity<number> {
    public fk_usuario: number;
    public fk_turma: number | null;
    public fk_turno: number | null;
    public semestre: number | null;

    private constructor(id: number, props: ParticipanteProps) {
        super(id);
        this.fk_usuario = props.fk_usuario;
        this.fk_turma = props.fk_turma ?? null;
        this.fk_turno = props.fk_turno ?? null;
        this.semestre = props.semestre ?? null;
    }

    static create(id: number, props: ParticipanteProps): Participante {
        return new Participante(id, props);
    }
}
