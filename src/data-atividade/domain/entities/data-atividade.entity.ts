import { Entity } from '../../../@core/domain/entity';

export interface DataAtividadeProps {
    data: Date;
    hora: Date;
    duracao?: Date | null;
    fk_atividade: number;
    senha?: string | null;
    qrcode?: string | null;
}

export class DataAtividadeEntity extends Entity<number> {
    public data: Date;
    public hora: Date;
    public duracao: Date | null;
    public fk_atividade: number;
    public senha: string | null;
    public qrcode: string | null;

    private constructor(id: number, props: DataAtividadeProps) {
        super(id);
        this.data = props.data;
        this.hora = props.hora;
        this.duracao = props.duracao ?? null;
        this.fk_atividade = props.fk_atividade;
        this.senha = props.senha ?? null;
        this.qrcode = props.qrcode ?? null;
    }

    static create(id: number, props: DataAtividadeProps): DataAtividadeEntity {
        return new DataAtividadeEntity(id, props);
    }
}
