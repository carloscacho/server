import { Entity } from '../../../@core/domain/entity';

export interface CertificadoProps {
    fk_participante: number;
    nome: string;
}

export class Certificado {
    public fk_participante: number;
    public nome: string;

    private constructor(props: CertificadoProps) {
        this.fk_participante = props.fk_participante;
        this.nome = props.nome;
    }

    static create(props: CertificadoProps): Certificado {
        return new Certificado(props);
    }
}
