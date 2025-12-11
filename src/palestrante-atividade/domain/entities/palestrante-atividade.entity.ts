/**
 * PalestranteAtividade - Junction table entity
 * Composite PK: fk_atividade + fk_palestrante
 */
export interface PalestranteAtividadeProps {
    fk_atividade: number;
    fk_palestrante: number;
}

export class PalestranteAtividade {
    public fk_atividade: number;
    public fk_palestrante: number;

    private constructor(props: PalestranteAtividadeProps) {
        this.fk_atividade = props.fk_atividade;
        this.fk_palestrante = props.fk_palestrante;
    }

    static create(props: PalestranteAtividadeProps): PalestranteAtividade {
        return new PalestranteAtividade(props);
    }
}
