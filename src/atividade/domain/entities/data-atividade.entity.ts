import { Entity } from '../../../@core/domain/entity';

export interface DataAtividadeProps {
    data: Date;
    hora: Date;
    duracao?: Date | null;
}

/**
 * DataAtividade Value Object - represents activity schedule
 */
export class DataAtividade {
    constructor(
        public readonly id: number,
        public data: Date,
        public hora: Date,
        public duracao: Date | null,
    ) { }

    static create(id: number, props: DataAtividadeProps): DataAtividade {
        return new DataAtividade(
            id,
            props.data,
            props.hora,
            props.duracao ?? null,
        );
    }

    static fromInput(input: { data: string; hora: string; duracao?: string }): DataAtividadeProps {
        return {
            data: new Date(input.data),
            hora: new Date(`1970-01-01T${input.hora}:00.000Z`),
            duracao: input.duracao
                ? new Date(`1970-01-01T${input.duracao}:00.000Z`)
                : null,
        };
    }
}
