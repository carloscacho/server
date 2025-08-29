export class DataAtividadeDTO {
  id_data_atividade?: number;
  data: Date;
  hora: Date;
  duracao?: Date;
  intervalo?: Date;
  fk_atividade: number;
  senha?: string;
  qrcode?: string;
}
