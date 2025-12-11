/**
 * EventoParticipante - Junction table entity
 * Composite PK: fk_evento + fk_participante
 */
export interface EventoParticipanteProps {
    fk_evento: number;
    fk_participante: number;
}

export class EventoParticipante {
    public fk_evento: number;
    public fk_participante: number;

    private constructor(props: EventoParticipanteProps) {
        this.fk_evento = props.fk_evento;
        this.fk_participante = props.fk_participante;
    }

    static create(props: EventoParticipanteProps): EventoParticipante {
        return new EventoParticipante(props);
    }
}
