import { IsString, IsOptional, IsNumber } from 'class-validator';

export class TurnoDTO {
  @IsOptional()
  @IsNumber()
  id_turno?: number;

  @IsString()
  nome: string;
}
