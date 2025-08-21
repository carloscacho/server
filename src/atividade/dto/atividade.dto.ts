export class AtividadeDTO {
  id_atividade?: number;
  nome: string;
  descricao?: string;
  observacao?: string;
  limite?: number;
  fk_sala?: number;
  fk_evento: number;
}
