import { Entity } from '../../../@core/domain/entity';

export interface EventoProps {
    nome: string;
    inicio: Date;
    final: Date;
    ano: number;
    slug?: string | null;
    banner?: string | null;
    cor_primaria?: string | null;
    cor_secundaria?: string | null;
    base_url?: string | null;
}

/**
 * Evento Domain Entity
 */
export class Evento extends Entity<number> {
    public nome: string;
    public inicio: Date;
    public final: Date;
    public ano: number;
    public slug: string | null;
    public banner: string | null;
    public cor_primaria: string | null;
    public cor_secundaria: string | null;
    public base_url: string | null;

    private constructor(id: number, props: EventoProps) {
        super(id);
        this.nome = props.nome;
        this.inicio = props.inicio;
        this.final = props.final;
        this.ano = props.ano;
        this.slug = props.slug ?? null;
        this.banner = props.banner ?? null;
        this.cor_primaria = props.cor_primaria ?? null;
        this.cor_secundaria = props.cor_secundaria ?? null;
        this.base_url = props.base_url ?? null;
    }

    static create(id: number, props: EventoProps): Evento {
        return new Evento(id, props);
    }

    static createNew(props: EventoProps): Evento {
        return new Evento(0, props);
    }

    isActive(): boolean {
        const now = new Date();
        return now >= this.inicio && now <= this.final;
    }

    hasStarted(): boolean {
        return new Date() >= this.inicio;
    }

    hasEnded(): boolean {
        return new Date() > this.final;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            inicio: this.inicio,
            final: this.final,
            ano: this.ano,
            slug: this.slug,
            banner: this.banner,
            cor_primaria: this.cor_primaria,
            cor_secundaria: this.cor_secundaria,
            base_url: this.base_url,
        };
    }
}
