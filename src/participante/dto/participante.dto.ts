import { IsNumber, IsOptional } from 'class-validator';

export class ParticipanteDTO {
  @IsOptional()
  @IsNumber()
  id_participante?: number;

  @IsOptional()
  @IsNumber()
  fk_turma?: number;

  @IsNumber()
  fk_usuario: number;

  @IsOptional()
  @IsNumber()
  fk_turno?: number;

  @IsOptional()
  @IsNumber()
  semestre?: number;
}
