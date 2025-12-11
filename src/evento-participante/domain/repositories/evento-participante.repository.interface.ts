import { EventoParticipante, EventoParticipanteProps } from '../entities/evento-participante.entity';

export interface IEventoParticipanteRepository {
    findById(fk_evento: number, fk_participante: number): Promise<EventoParticipante | null>;
    findByEvento(fk_evento: number): Promise<EventoParticipante[]>;
    findByParticipante(fk_participante: number): Promise<EventoParticipante[]>;
    create(data: EventoParticipanteProps): Promise<EventoParticipante>;
    delete(fk_evento: number, fk_participante: number): Promise<void>;
}

export const EVENTO_PARTICIPANTE_REPOSITORY = Symbol('EVENTO_PARTICIPANTE_REPOSITORY');
