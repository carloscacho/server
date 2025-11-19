import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CertificadoDTO {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  fk_participante: number;
}
