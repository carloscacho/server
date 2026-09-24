import { IsString, IsInt, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class RecursoAtividadeDTO {
  @IsString()
  nome: string;

  @IsString()
  @IsIn(['UPLOAD', 'LINK'])
  tipo_envio: string;

  @IsOptional()
  @IsString()
  formato?: string;

  @IsOptional()
  @IsString()
  url_arquivo?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  fk_atividade: number;
}
