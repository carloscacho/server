import { Entity } from '../../../@core/domain/entity';
import { DataAtividade, DataAtividadeProps } from './data-atividade.entity';

export interface AtividadeProps {
    nome: string;
    descricao?: string | null;
    observacao?: string | null;
    limite?: number | null;
    fk_sala?: number | null;
    fk_evento: number;
    fk_atividade_vinculada?: number | null;
    palestrantes?: number[];
    dataAtividade?: DataAtividade | null;
}

/**
 * Atividade Domain Entity
 */
export class Atividade extends Entity<number> {
    public nome: string;
    public descricao: string | null;
    public observacao: string | null;
    public limite: number | null;
    public fk_sala: number | null;
    public fk_evento: number;
    public fk_atividade_vinculada: number | null;
    public palestrantes: number[];
    public dataAtividade: DataAtividade | null;

    private constructor(id: number, props: AtividadeProps) {
        super(id);
        this.nome = props.nome;
        this.descricao = props.descricao ?? null;
        this.observacao = props.observacao ?? null;
        this.limite = props.limite ?? null;
        this.fk_sala = props.fk_sala ?? null;
        this.fk_evento = props.fk_evento;
        this.fk_atividade_vinculada = props.fk_atividade_vinculada ?? null;
        this.palestrantes = props.palestrantes ?? [];
        this.dataAtividade = props.dataAtividade ?? null;
    }

    static create(id: number, props: AtividadeProps): Atividade {
        return new Atividade(id, props);
    }

    static createNew(props: AtividadeProps): Atividade {
        return new Atividade(0, props);
    }

    hasSpeakers(): boolean {
        return this.palestrantes.length > 0;
    }

    hasSchedule(): boolean {
        return this.dataAtividade !== null;
    }

    hasCapacityLimit(): boolean {
        return this.limite !== null && this.limite > 0;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            observacao: this.observacao,
            limite: this.limite,
            fk_sala: this.fk_sala,
            fk_evento: this.fk_evento,
            fk_atividade_vinculada: this.fk_atividade_vinculada,
            palestrantes: this.palestrantes,
            dataAtividade: this.dataAtividade,
        };
    }
}
