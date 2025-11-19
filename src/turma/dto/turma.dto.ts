import { IsString, IsOptional, IsNumber } from 'class-validator';

export class TurmaDTO {
  @IsOptional()
  @IsNumber()
  id_turma?: number;

  @IsString()
  nome: string;
}
