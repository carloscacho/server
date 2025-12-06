import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class DataAtividadeParticipanteDTO {
  @IsNumber()
  fk_data_atividade: number;

  @IsNumber()
  fk_participante: number;

  @IsOptional()
  @IsNumber()
  presenca?: number;
}
