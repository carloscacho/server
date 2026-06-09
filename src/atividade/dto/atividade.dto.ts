import { IsString, IsOptional, IsNumber, IsNotEmpty, IsArray, IsObject } from 'class-validator';

export class AtividadeDTO {
  @IsOptional()
  @IsNumber()
  id_atividade?: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsNumber()
  limite?: number;

  @IsOptional()
  @IsNumber()
  fk_sala?: number;

  @IsNotEmpty()
  @IsNumber()
  fk_evento: number;

  @IsOptional()
  @IsNumber()
  fk_atividade_vinculada?: number;

  @IsOptional()
  @IsArray()
  palestrantes?: number[];

  @IsOptional()
  @IsArray()
  palestrantes_detalhes?: {
    nome: string;
    email: string;
    instituicao?: string;
  }[];

  @IsOptional()
  @IsObject()
  data_atividade?: {
    data: string;
    hora: string;
    duracao?: string;
  };
}
