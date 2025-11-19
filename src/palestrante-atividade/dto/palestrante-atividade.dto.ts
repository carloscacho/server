import { IsNumber } from 'class-validator';

export class PalestranteAtividadeDTO {
  @IsNumber()
  fk_palestrante: number;

  @IsNumber()
  fk_atividade: number;
}
