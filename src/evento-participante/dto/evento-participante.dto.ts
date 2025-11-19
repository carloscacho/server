import { IsNumber } from 'class-validator';

export class EventoParticipanteDTO {
  @IsNumber()
  fk_evento: number;

  @IsNumber()
  fk_participante: number;
}
