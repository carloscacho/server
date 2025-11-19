import { IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class PalestranteDTO {
  @IsOptional()
  @IsNumber()
  id_palestrante?: number;

  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsNumber()
  fk_evento?: number;
}
