import { IsString, IsOptional, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class EventoDTO {
  @IsOptional()
  @IsNumber()
  id_evento?: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsDateString()
  data_inicio: Date;

  @IsNotEmpty()
  @IsDateString()
  data_fim: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  ano: number;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  banner?: string;

  @IsOptional()
  @IsString()
  cor_primaria?: string;

  @IsOptional()
  @IsString()
  cor_secundaria?: string;

  @IsOptional()
  @IsString()
  base_url?: string;
}
