import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SalaDTO {
  @IsOptional()
  @IsNumber()
  id_sala?: number;

  @IsString()
  nome: string;
}